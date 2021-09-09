<?php declare(strict_types=1);

namespace Wbm\TagManagerEcomm\Subscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Wbm\TagManagerEcomm\Services\DataLayerModulesInterface;
use Wbm\TagManagerEcomm\Services\DataLayerRendererInterface;
use Wbm\TagManagerEcomm\Utility\SessionUtility;

class KernelEventsSubscriber implements EventSubscriberInterface
{
    /**
     * @var DataLayerModulesInterface
     */
    private $modules;

    /**
     * @var DataLayerRendererInterface
     */
    private $dataLayerRenderer;

    public function __construct(
        DataLayerModulesInterface $modules,
        DataLayerRendererInterface $dataLayerRender
    ) {
        $this->modules = $modules;
        $this->dataLayerRenderer = $dataLayerRender;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::CONTROLLER => [
                ['getDataLayerForXmlHttpRequest'],
            ],
            KernelEvents::RESPONSE => [
                ['prependDataLayerToResponse'],
            ],
        ];
    }

    public function getDataLayerForXmlHttpRequest(ControllerEvent $event): void
    {
        $salesChannelId = $event->getRequest()->get('sw-sales-channel-id');
        $isActive = !empty($this->modules->getContainerId($salesChannelId)) && $this->modules->isActive($salesChannelId);

        if ($isActive && !$event->getRequest()->getSession()->get(SessionUtility::ATTRIBUTE_NAME)) {
            $modules = $this->modules->getModules();
            $route = $event->getRequest()->attributes->get('_route');

            if (array_key_exists($route, $modules) && !empty($modules[$route])) {
                $this->dataLayerRenderer->setVariables($route, [])
                    ->renderDataLayer($route);
            }
        }
    }

    public function prependDataLayerToResponse(ResponseEvent $event): void
    {
        $response = $event->getResponse();
        $request = $event->getRequest();
        $session = $request->getSession();
        $storedDatalayer = $session->get(SessionUtility::ATTRIBUTE_NAME);
        $session->remove(SessionUtility::ATTRIBUTE_NAME);

        $route = $event->getRequest()->attributes->get('_route');
        $dataLayer = $this->dataLayerRenderer->getDataLayer($route);
        if ($dataLayer !== null) {
            $dataLayer = $this->updateWithSessionVars($dataLayer, $session);
            $dataLayer = json_encode($dataLayer);
        }

        if (!empty($dataLayer) && $response->isRedirect()) {
            $session->set(SessionUtility::ATTRIBUTE_NAME, $dataLayer);

            return;
        }

        if (!$request->isXmlHttpRequest()) {
            return;
        }

        if ($storedDatalayer && in_array($route, $this->modules->getResponseRoutes(), true)) {
            $dataLayer = $storedDatalayer;
        }

        if (empty($dataLayer)) {
            return;
        }

        $dataLayerScriptTag = sprintf(
            '<script id="wbm-data-layer">%s</script>',
            $dataLayer
        );

        $content = $dataLayerScriptTag . PHP_EOL . $response->getContent();
        $response->setContent($content);

        $event->setResponse($response);
    }

    /**
     * @TODO: function is a quickfix and should be refactored
     * @param array $dataLayer
     * @param Session $session
     * @return array
     * @throws \JsonException
     */
    private function updateWithSessionVars(array $dataLayer, SessionInterface $session): array
    {
        if (!$session->has(SessionUtility::UPDATE_FLAG)) {
            return $dataLayer;
        }

        if ($session->get(SessionUtility::UPDATE_FLAG) === SessionUtility::ADDCART_UPDATEFLAG_VALUE) {
            foreach ($dataLayer as &$dLayer) {
                $dLayer = json_decode($dLayer, true, 512, JSON_THROW_ON_ERROR);
                foreach ($dLayer['ecommerce']['add']['products'] as &$product) {
                    $lineItems = $session->get(SessionUtility::ADDCART_CART_ITEMS);
                    $product['price'] = $lineItems[$product['id']];
                }
                unset($product);
                $dLayer = json_encode($dLayer);
            }
            $session->remove(SessionUtility::UPDATE_FLAG);
            $session->remove(SessionUtility::ADDCART_CART_ITEMS);
        }

        return $dataLayer;
    }
}
