import Plugin from 'src/plugin-system/plugin.class';
import DomAccess from 'src/helper/dom-access.helper';

export default class ProductClickTracking extends Plugin {

    init() {
        this.registerEvents();
    }

    registerEvents() {
        var self = this;
        this.el.addEventListener('click', function (event) {
            self.onProductClicked(event)
        });
    }

    setImpressions() {
        var self = this;

        var dataLayer = window.dataLayer;
        if (typeof onEventDataLayer !== 'undefined') {
            dataLayer = onEventDataLayer;
        }

        if (dataLayer) {
            for (let i = 0; i < window.dataLayer.length; i++) {
                var layer = window.dataLayer[i];

                if (layer.ecommerce && layer.ecommerce.impressions) {
                    self.impressions = layer.ecommerce.impressions;
                }
            }
        }
    }

    onProductClicked(event) {
        var self = this;
        self.setImpressions();

        var inputField = DomAccess.querySelector(self.el, '[itemprop="mpn"]'),
            productNo = DomAccess.getAttribute(inputField, 'content'),
            product = self.impressions.find(function (value, index) {
                return value.id === productNo;
            });

        console.log(product);
        if (product === undefined) {
            return;
        }

        console.log(event.target);
        event.preventDefault()

        if (event.target.nodeName === 'A') {
            window.dataLayer.push({
                'event': 'productClick',
                'ecommerce': {
                    'click': {
                        'actionField': {'list': product.list},
                        'products': [product]
                    }
                }
            });
            document.location = DomAccess.getAttribute(event.target, 'href');
        } else {
            console.log('do not send click');
        }
    }
}
