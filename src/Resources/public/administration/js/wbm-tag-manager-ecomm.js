(this.webpackJsonp=this.webpackJsonp||[]).push([["wbm-tag-manager-ecomm"],{"03Au":function(e,t,n){var a=n("1agy");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);(0,n("SZ7m").default)("26b36946",a,!0,{})},"1agy":function(e,t,n){},"3r99":function(e){e.exports=JSON.parse('{"wbm-tagmanager":{"properties":{"title":"dataLayer Properties","modulesButton":"Modules","nameLabel":"Name","valueLabel":"Value","onLoadEventLabel":"Push as separate event","eventNameLabel":"Eventname","saveButton":"Save"}}}')},"5Yb5":function(e){e.exports=JSON.parse('{"wbm-tagmanager":{"tabs":{"menuEntry":"Google Tag Manager","title":"Google Tag Manager + Enhanced E-Commerce Tracking","modulesButton":"Modules","exportButton":"Export data layers","importHeader":"Import data layers","importButton":"Import","backButton":"Back","jsonImportLabel":"json Import File","truncateLabel":"Truncate tables before import","allStorefronts":"All Storefronts","containerIdHeadline":"GTM Container IDs","addContainerId":"Edit Container IDs"}}}')},"8Pam":function(e,t){e.exports='{% block wbm_module_detail %}\n    <sw-page class="wbm-module-detail">\n        <template slot="smart-bar-actions">\n            <sw-button :routerLink="{ name: \'wbm.module.list\' }">\n                {{ $t(\'wbm-tagmanager.modules.cancelButton\') }}\n            </sw-button>\n\n            <sw-button-process\n                    :isLoading="isLoading"\n                    :processSuccess="processSuccess"\n                    variant="primary"\n                    @process-finish="saveFinish"\n                    @click="onClickSave">\n                {{ $t(\'wbm-tagmanager.modules.saveButton\') }}\n            </sw-button-process>\n        </template>\n\n        <template slot="content">\n            <sw-card-view>\n                <sw-card v-if="module" :isLoading="isLoading">\n                    <sw-field :label="$t(\'wbm-tagmanager.modules.nameLabel\')" v-model="module.name"></sw-field>\n\n                    <sw-field :label="$t(\'wbm-tagmanager.modules.moduleLabel\')" v-model="module.module"></sw-field>\n\n                    <sw-field :label="$t(\'wbm-tagmanager.modules.responseLabel\')" v-model="module.response"></sw-field>\n                </sw-card>\n            </sw-card-view>\n        </template>\n    </sw-page>\n{% endblock %}'},"9HSd":function(e){e.exports=JSON.parse('{"wbm-tagmanager":{"modules":{"title":"dataLayer Module","propertiesButton":"Eigenschaften","addModulesButton":"Modul hinzufügen","nameLabel":"Name","moduleLabel":"Route","responseLabel":"Alternative Route der Response","saveButton":"Speichern","cancelButton":"Abbrechen"}}}')},BoKu:function(e){e.exports=JSON.parse('{"wbm-tagmanager":{"tabs":{"menuEntry":"Google Tag Manager","title":"Google Tag Manager + Enhanced E-Commerce Tracking","modulesButton":"Module","exportButton":"Exportiere Datenschichten","importHeader":"Importiere Datenschichten","importButton":"Importieren","backButton":"Zurück","jsonImportLabel":"json Import Datei","truncateLabel":"Tabellen vor Import leeren","allStorefronts":"Alle Storefronts","containerIdHeadline":"GTM Container IDs","addContainerId":"Container IDs bearbeiten"}}}')},DdfT:function(e,t,n){"use strict";n.r(t);var a=n("sNvC"),o=n.n(a);const{Component:r}=Shopware,{Criteria:s}=Shopware.Data;r.register("wbm-module-list",{template:o.a,inject:["repositoryFactory","context"],data:()=>({repository:null,modules:null}),metaInfo(){return{title:this.$createTitle()}},computed:{columns(){return[{property:"name",dataIndex:"name",label:this.$t("wbm-tagmanager.modules.nameLabel"),routerLink:"wbm.module.detail",inlineEdit:"string",allowResize:!0,primary:!0}]}},created(){this.repository=this.repositoryFactory.create("wbm_data_layer_modules"),this.repository.search(new s,Shopware.Context.api).then(e=>{this.modules=e})}});var i=n("8Pam"),l=n.n(i);const{Component:p,Mixin:m}=Shopware;p.register("wbm-module-detail",{template:l.a,inject:["repositoryFactory","context"],mixins:[m.getByName("notification")],metaInfo(){return{title:this.$createTitle()}},data:()=>({module:null,isLoading:!1,processSuccess:!1,repository:null}),created(){this.repository=this.repositoryFactory.create("wbm_data_layer_modules"),this.propertyRepository=this.repositoryFactory.create("wbm_data_layer_properties"),this.getModule()},methods:{getModule(){this.repository.get(this.$route.params.id,Shopware.Context.api).then(e=>{this.module=e})},onClickSave(){this.isLoading=!0,this.repository.save(this.module,Shopware.Context.api).then(()=>{this.getModule(),this.isLoading=!1,this.processSuccess=!0}).catch(e=>{this.isLoading=!1,this.createNotificationError({title:"Error",message:e})})},saveFinish(){this.processSuccess=!1}}});n("GauA");var d=n("9HSd"),c=n("lBss");const{Module:u}=Shopware;u.register("wbm-module",{color:"#ff3d58",icon:"default-shopping-paper-bag-product",title:"wbm-tagmanager.modules.title",description:"",snippets:{"de-DE":d,"en-GB":c},routes:{list:{component:"wbm-module-list",path:"list"},detail:{component:"wbm-module-detail",path:"detail/:id",meta:{parentPath:"wbm.module.list"}},create:{component:"wbm-module-create",path:"create",meta:{parentPath:"wbm.module.list"}}}});var h=n("xZel"),g=n.n(h);const{Component:b}=Shopware,{Criteria:w}=Shopware.Data;b.register("wbm-property-tree",{template:g.a,inject:["repositoryFactory","context"],props:{module:{type:String,required:!1}},watch:{module(){this.onModuleChange()}},data:()=>({properties:{},loadedParentIds:[],linkContext:"wbm.property.detail",isLoadingInitialData:!0,noSyncMode:!1}),created(){this.createdComponent()},computed:{propertyRepository(){return this.repositoryFactory.create("wbm_data_layer_properties")},getProperties(){return Object.values(this.properties)}},methods:{createdComponent(){this.onModuleChange()},onModuleChange(){this.isLoadingInitialData=!0,this.repository=this.repositoryFactory.create("wbm_data_layer_properties");const e=new w;e.limit=500,e.addFilter(w.equals("parentId",null)),e.addFilter(w.equals("module",this.module));const t={},n=[];this.repository.search(e,Shopware.Context.api).then(e=>{e.forEach(e=>{t[e.id]=e,n.push(e.parentId)}),this.properties={...t},this.loadedParentIds=n,this.isLoadingInitialData=!1,this.getProperties.forEach(e=>{this.onGetTreeItems(e.id).then(()=>{this.$refs.swTree&&e&&this.$refs.swTree.openTreeById(e.id)})})})},getChildrenFromParent(e){return this.onGetTreeItems(e)},onGetTreeItems(e){if(this.loadedParentIds.includes(e))return Promise.resolve();this.loadedParentIds.push(e);const t=new w(1,500);return t.addFilter(w.equals("parentId",e)),t.addFilter(w.equals("module",this.module)),this.propertyRepository.search(t,Shopware.Context.api).then(e=>{this.addProperties(e),e.forEach(e=>{this.onGetTreeItems(e.id).then(()=>{if(this.$refs.swTree&&e)try{this.$refs.swTree.openTreeById(e.id)}catch(e){}})})}).catch(()=>{this.loadedParentIds=this.loadedParentIds.filter(t=>t!==e)})},onUpdatePositions({draggedItem:e,oldParentId:t,newParentId:n}){e.children.length>0&&(e.children.forEach(e=>{this.removeFromStore(e.id)}),this.loadedParentIds=this.loadedParentIds.filter(t=>t!==e.id)),this.syncSiblings({parentId:n}).then(()=>{t!==n&&this.syncSiblings({parentId:t})})},changeProperty(e){this.$parent.$emit("wbm-property-id-change",e.id)},createNewElement(e,t,n=""){!t&&e&&(t=e.parentId);const a=this.createNewProperty(n,t);return this.addProperty(a),a},createNewProperty(e,t){const n=this.propertyRepository.create(Shopware.Context.api);return n.name=e,n.parentId=t,n.module=this.$route.params.module,n.childCount=0,n.value="",n.save=()=>this.propertyRepository.save(n,Shopware.Context.api).then(()=>{const e=new w;e.setIds([n.id,t].filter(e=>null!==e)),this.propertyRepository.search(e,Shopware.Context.api).then(e=>{this.addProperties(e)})}),n},addProperty(e){this.properties[e.id]=e,this.properties={...this.properties}},addProperties(e){e.forEach(e=>{this.properties[e.id]=e}),this.properties={...this.properties}},onDeleteProperty({data:e}){return e.isNew()?(delete this.properties[e.id],this.properties={...this.properties},Promise.resolve()):(this.$parent.$emit("wbm-property-id-change",null),this.propertyRepository.delete(e.id,Shopware.Context.api).then(()=>{this.removeFromStore(e.id),null!==e.parentId&&this.propertyRepository.get(e.parentId,Shopware.Context.api).then(e=>{const t=this.getProperties.filter(t=>t.parentId===e.id);e.childCount=t.length,this.propertyRepository.save(e,Shopware.Context.api).then(()=>{this.addProperty(e)})})}))},onEditEnd({parentId:e}){return!0===this.noSyncMode?Promise.resolve():this.syncSiblings({parentId:e})},syncSiblings({parentId:e}){const t=this.getProperties.filter(t=>t.parentId===e);return this.propertyRepository.sync(t,Shopware.Context.api).then(()=>(this.loadedParentIds=this.loadedParentIds.filter(t=>t!==e),this.getChildrenFromParent(e))).then(()=>{const n=this.getProperties.filter(t=>t.id===e);n.length&&(n[0].childCount=t.length,this.propertyRepository.sync(n,Shopware.Context.api).then(e=>{this.addProperty(e)}))})},removeFromStore(e){const t=this.getDeletedIds(e);this.loadedParentIds=this.loadedParentIds.filter(e=>!t.includes(e)),t.forEach(e=>{delete this.properties[e]}),this.properties={...this.properties}},getDeletedIds(e){const t=[e];return Object.keys(this.properties).forEach(n=>{this.properties[n].parentId===e&&t.push(...this.getDeletedIds(n))}),t}}});n("Z15p");var y=n("f7tg"),f=n.n(y);n("s3nF");const{Component:v}=Shopware,{Criteria:I}=Shopware.Data;v.register("wbm-property-list",{template:f.a,inject:["repositoryFactory","context"],data:()=>({repository:null,modules:null}),metaInfo(){return{title:this.$createTitle()}},computed:{columns(){return[{property:"name",dataIndex:"name",label:this.$t("wbm-tagmanager.properties.nameLabel"),routerLink:"wbm.property.detail",inlineEdit:"string",allowResize:!0,primary:!0},{property:"value",dataIndex:"value",label:this.$t("wbm-tagmanager.properties.valueLabel"),routerLink:"wbm.property.detail",inlineEdit:"string",allowResize:!0}]}},created(){this.repositoryFactory.create("wbm_data_layer_modules").search(new I,Shopware.Context.api).then(e=>{this.modules=e})}});var C=n("r8oV"),S=n.n(C);const{Component:x,Mixin:L}=Shopware;x.register("wbm-property-detail",{template:S.a,inject:["repositoryFactory","context"],props:{propertyId:{type:Number,required:!1},module:{type:String,required:!1}},watch:{module(){this.onModuleChange()}},mixins:[L.getByName("notification")],metaInfo(){return{title:this.$createTitle()}},data:()=>({propertyId:null,module:null,property:null,isLoading:!1,processSuccess:!1,repository:null}),created(){this.$parent.$on("wbm-property-id-change",this.setProperty)},methods:{onModuleChange(){this.propertyId=null,this.property=null},setProperty(e){e?(this.repository=this.repositoryFactory.create("wbm_data_layer_properties"),this.propertyId=e,this.getProperty()):this.property=null},getProperty(){this.repository.get(this.propertyId,Shopware.Context.api).then(e=>{null===e.value&&(e.value=""),this.property=e})},onClickSave(){this.isLoading=!0,console.log(this.property),this.property.value=this.property.value.replace(/(\r\n|\n|\r)/gm,""),this.repository.save(this.property,Shopware.Context.api).then(()=>{this.getProperty(),this.isLoading=!1,this.processSuccess=!0,this.$parent.$parent.$refs.wbmPropertyTree.onModuleChange()}).catch(e=>{this.isLoading=!1,this.createNotificationError({title:"Error",message:e})})},saveFinish(){this.processSuccess=!1}}});var k=n("mLM6"),_=n("3r99");const{Module:E}=Shopware;E.register("wbm-property",{color:"#ff3d58",icon:"default-shopping-paper-bag-product",title:"wbm-tagmanager.properties.title",description:"",snippets:{"de-DE":k,"en-GB":_},routes:{list:{component:"wbm-property-list",path:"list/:module"}}});var $=n("dJJ2"),M=n.n($);n("03Au");const{Component:P}=Shopware,{Criteria:T}=Shopware.Data;P.register("wbm-tagmanager-tabs",{template:M.a,inject:["repositoryFactory","context","systemConfigApiService"],data:()=>({repository:null,modules:null,loadedConfig:!1,config:null}),metaInfo(){return{title:this.$createTitle()}},created(){this.repository=this.repositoryFactory.create("wbm_data_layer_modules"),this.repository.search(new T,Shopware.Context.api).then(e=>{this.modules=e}),this.salesChannelRepository=this.repositoryFactory.create("sales_channel");const e=[];this.systemConfigApiService.getValues("WbmTagManagerEcomm.config").then(t=>{const n=t["WbmTagManagerEcomm.config.containerId"],a=void 0!==t["WbmTagManagerEcomm.config.isInactive"]&&t["WbmTagManagerEcomm.config.isInactive"];e.push({salesChannel:this.$t("wbm-tagmanager.tabs.allStorefronts"),containerId:n,isInactive:a}),this.salesChannelRepository.search(new T,Shopware.Context.api).then(t=>{t.forEach((t,o,r)=>{this.systemConfigApiService.getValues("WbmTagManagerEcomm.config",t.id).then(s=>{const i=void 0===s["WbmTagManagerEcomm.config.containerId"]?n:s["WbmTagManagerEcomm.config.containerId"],l=void 0===s["WbmTagManagerEcomm.config.isInactive"]?a:s["WbmTagManagerEcomm.config.isInactive"];e.push({salesChannel:t.name,containerId:i,isInactive:l}),o===r.length-1&&(this.config=e,this.loadedConfig=!0)})})})})},methods:{onClickExport(){const e={Authorization:"Bearer "+Shopware.Context.api.authToken.access,"Content-Type":"application/json"};Shopware.Application.getContainer("init").httpClient.get("_action/wbm-tagmanager/export",{headers:e}).then(e=>{const t=window.URL.createObjectURL(new Blob([e.data])),n=document.createElement("a");n.href=t,n.setAttribute("download","dataLayer.json"),document.body.appendChild(n),n.click()})}}});var B=n("vu65"),F=n.n(B);const{Component:R,Mixin:D}=Shopware;R.register("wbm-tagmanager-import",{template:F.a,mixins:[D.getByName("notification")],metaInfo(){return{title:this.$createTitle()}},data:()=>({isLoading:!1,file:null,truncate:!0}),methods:{truncateChange(e){console.log(e),this.truncate=e},handleFileUpload(){this.file=this.$refs.file.selectedFile},onClickImport(e){e.preventDefault();const t={Authorization:"Bearer "+Shopware.Context.api.authToken.access,"Content-Type":"multipart/form-data"},n=new FormData;n.append("file",this.file),n.append("truncate",this.truncate),Shopware.Application.getContainer("init").httpClient.post("_action/wbm-tagmanager/import",n,{headers:t}).then(()=>{this.$router.push({name:"wbm.tagmanager.tabs"})})}}});var N=n("BoKu"),A=n("5Yb5");const{Module:j}=Shopware;j.register("wbm-tagmanager",{color:"#ff3d58",icon:"default-shopping-paper-bag-product",title:"wbm-tagmanager.tabs.title",description:"",snippets:{"de-DE":N,"en-GB":A},routes:{tabs:{component:"wbm-tagmanager-tabs",path:"tabs"},import:{component:"wbm-tagmanager-import",path:"import"}},navigation:[{label:"wbm-tagmanager.tabs.menuEntry",color:"#00acd2",path:"wbm.tagmanager.tabs",icon:"default-text-code",position:100}]})},F8JI:function(e,t,n){},GauA:function(e,t){const{Component:n}=Shopware;n.extend("wbm-module-create","wbm-module-detail",{methods:{getModule(){this.module=this.repository.create(Shopware.Context.api)},onClickSave(){this.isLoading=!0,this.repository.save(this.module,Shopware.Context.api).then(()=>{this.isLoading=!1,this.$router.push({name:"wbm.module.list"})}).catch(e=>{this.isLoading=!1,this.createNotificationError({title:"Error",message:e})})}}})},Z15p:function(e,t){const{Component:n}=Shopware;n.extend("wbm-tree-item","sw-tree-item",{methods:{abortCreateElement(e){null===this.parentScope.currentEditMode&&null===e.parentId&&(this.parentScope.$parent.noSyncMode=!0),this.parentScope.abortCreateElement(e),this.parentScope.$parent.noSyncMode=!1}}})},dJJ2:function(e,t){e.exports='{% block wbm_tagmanager_tabs %}\n    <sw-page class="wbm-tagmanager-tabs">\n        {% block wbm_tagmanager_tabs_smart_bar %}\n            <template slot="smart-bar-header">\n                <sw-tabs variant="minimal" v-if="modules">\n                    <sw-tabs-item\n                            v-for="module in modules"\n                            :route="{ name: \'wbm.property.list\', params: { module: module.module } }">\n                        {{ module.name }}\n                    </sw-tabs-item>\n                    <template slot="content">\n                        <sw-button variant="primary" :routerLink="{ name: \'wbm.module.list\' }">\n                            {{ $t(\'wbm-tagmanager.tabs.modulesButton\') }}\n                        </sw-button>\n                        <sw-button-process\n                                variant="primary"\n                                @click="onClickExport">\n                            {{ $t(\'wbm-tagmanager.tabs.exportButton\') }}\n                        </sw-button-process>\n                        <sw-button variant="primary" :routerLink="{ name: \'wbm.tagmanager.import\' }">\n                            {{ $t(\'wbm-tagmanager.tabs.importHeader\') }}\n                        </sw-button>\n                    </template>\n                </sw-tabs>\n            </template>\n        {% endblock %}\n\n        <template slot="content">\n            {% block wbm_tagmanager_tabs_content %}\n                <sw-card-view>\n                    <sw-card v-if="loadedConfig">\n                        <h2>{{ $t(\'wbm-tagmanager.tabs.containerIdHeadline\') }}</h2>\n                        <sw-grid :items="config"\n                                 :header="false"\n                                 :selectable="false"\n                                 :allSelectable="false"\n                                 :isFullpage="false"\n                                 table>\n                            <template slot="columns" slot-scope="{ item }">\n                                <sw-grid-column flex="minmax(200px, 1fr)" dataIndex="salesChannel">\n                                    {{ item.salesChannel }}\n                                </sw-grid-column>\n                                <sw-grid-column flex="minmax(200px, 1fr)" dataIndex="containerId">\n                                    {{ item.containerId }}\n                                </sw-grid-column>\n                                <sw-grid-column flex="minmax(50px, 50px)" dataIndex="isInactive">\n                                    <sw-icon\n                                            small\n                                            name="small-default-x-line-small"\n                                            v-if="item.isInactive || !item.containerId"></sw-icon>\n                                    <sw-icon\n                                            small\n                                            name="small-default-checkmark-line-small"\n                                            v-else></sw-icon>\n                                </sw-grid-column>\n                            </template>\n                        </sw-grid>\n                        <sw-button :routerLink="{ name: \'sw.plugin.settings\', params: { namespace: \'WbmTagManagerEcomm\' } }">\n                            {{ $t(\'wbm-tagmanager.tabs.addContainerId\') }}\n                        </sw-button>\n                    </sw-card>\n                    <sw-loader v-else></sw-loader>\n\n                    <sw-card>\n                        <iframe src="https://plugins.webmatch.de/wbm_tag_manager/info.php"\n                                style="height:50px;width:100%;border:0"></iframe>\n                    </sw-card>\n                </sw-card-view>\n            {% endblock %}\n        </template>\n    </sw-page>\n{% endblock %}'},f7tg:function(e,t){e.exports='{% block wbm_property_list %}\n    <sw-page class="wbm-property-list">\n        {% block wbm_property_list_smart_bar %}\n            <template slot="smart-bar-header">\n                <sw-tabs variant="minimal" v-if="modules">\n                    <sw-tabs-item\n                            v-for="module in modules"\n                            :route="{ name: \'wbm.property.list\', params: { module: module.module } }"\n                            :active="module.module == $route.params.module">\n                        {{ module.name }}\n                    </sw-tabs-item>\n                    <template slot="content">\n                        <sw-button variant="primary" :routerLink="{ name: \'wbm.module.list\' }">\n                            {{ $t(\'wbm-tagmanager.properties.modulesButton\') }}\n                        </sw-button>\n                    </template>\n                </sw-tabs>\n            </template>\n        {% endblock %}\n\n        <template #side-content>\n            <wbm-property-tree\n                    ref="wbmPropertyTree"\n                    :module="$route.params.module"\n            ></wbm-property-tree>\n        </template>\n\n        <template slot="content">\n            {% block wbm_property_list_content %}\n                <wbm-property-detail\n                        :module="$route.params.module"\n                ></wbm-property-detail>\n            {% endblock %}\n        </template>\n    </sw-page>\n{% endblock %}'},lBss:function(e){e.exports=JSON.parse('{"wbm-tagmanager":{"modules":{"title":"dataLayer Modules","propertiesButton":"Properties","addModulesButton":"Add Module","nameLabel":"Name","moduleLabel":"Route","responseLabel":"Alternative Response Route","saveButton":"Save","cancelButton":"Cancel"}}}')},mLM6:function(e){e.exports=JSON.parse('{"wbm-tagmanager":{"properties":{"title":"dataLayer Eigenschaften","modulesButton":"Module","nameLabel":"Name","valueLabel":"Wert","onLoadEventLabel":"Als separates Event pushen","eventNameLabel":"Eventname","saveButton":"Speichern"}}}')},r8oV:function(e,t){e.exports='{% block wbm_property_detail %}\n    <sw-card-view>\n        <sw-card v-if="property" :isLoading="isLoading">\n            <sw-field :label="$t(\'wbm-tagmanager.properties.nameLabel\')" v-model="property.name"></sw-field>\n\n            <sw-code-editor\n                    :label="$t(\'wbm-tagmanager.properties.valueLabel\')"\n                    name="value"\n                    identifier="value"\n                    completionMode="entity"\n                    v-model="property.value">\n            </sw-code-editor>\n\n            <sw-checkbox-field\n                :label="$t(\'wbm-tagmanager.properties.onLoadEventLabel\')"\n                v-model="property.onEvent"\n                v-if="!property.parentId">\n            </sw-checkbox-field>\n            <sw-field :label="$t(\'wbm-tagmanager.properties.eventNameLabel\')"\n                      v-model="property.eventName"\n                      v-if="property.onEvent">\n            </sw-field>\n\n            <sw-button-process\n                    :isLoading="isLoading"\n                    :processSuccess="processSuccess"\n                    variant="primary"\n                    @process-finish="saveFinish"\n                    @click="onClickSave">\n                {{ $t(\'wbm-tagmanager.properties.saveButton\') }}\n            </sw-button-process>\n        </sw-card>\n    </sw-card-view>\n{% endblock %}\n'},s3nF:function(e,t,n){var a=n("F8JI");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);(0,n("SZ7m").default)("e07f007e",a,!0,{})},sNvC:function(e,t){e.exports='{% block wbm_module_list %}\n    <sw-page class="wbm-module-list">\n        {% block wbm_module_list_smart_bar_actions %}\n            <template slot="smart-bar-actions">\n                <sw-button variant="primary" :routerLink="{ name: \'wbm.tagmanager.tabs\' }">\n                    {{ $t(\'wbm-tagmanager.modules.propertiesButton\') }}\n                </sw-button>\n                <sw-button variant="primary" :routerLink="{ name: \'wbm.module.create\' }">\n                    {{ $t(\'wbm-tagmanager.modules.addModulesButton\') }}\n                </sw-button>\n            </template>\n        {% endblock %}\n\n        <template slot="content">\n            {% block wbm_module_list_content %}\n                <sw-entity-listing\n                        v-if="modules"\n                        :items="modules"\n                        :repository="repository"\n                        :showSelection="false"\n                        :columns="columns"\n                        detailRoute="wbm.module.detail">\n                </sw-entity-listing>\n            {% endblock %}\n        </template>\n    </sw-page>\n{% endblock %}'},vu65:function(e,t){e.exports='{% block wbm_tagmanager_import %}\n    <sw-page class="wbm-tagmanager-import">\n        <template slot="smart-bar-header">\n            <h2> {{ $tc(\'wbm-tagmanager.tabs.importHeader\') }}</h2>\n        </template>\n\n        <template slot="smart-bar-actions">\n            <sw-button :routerLink="{ name: \'wbm.tagmanager.tabs\' }">\n                {{ $t(\'wbm-tagmanager.tabs.backButton\') }}\n            </sw-button>\n        </template>\n\n        <template slot="content">\n            <sw-card-view>\n                <sw-card :isLoading="isLoading">\n                    <sw-file-input\n                            ref="file"\n                            @change="handleFileUpload"\n                            :label="$t(\'wbm-tagmanager.tabs.jsonImportLabel\')"\n                            :allowedMimeTypes="[\'application/json\']"\n                            :maxFileSize="8*1024*1024">\n                    </sw-file-input>\n\n                    <br><br>\n\n                    <sw-field\n                            type="checkbox"\n                            name="truncate"\n                            ref="truncate"\n                            :label="$t(\'wbm-tagmanager.tabs.truncateLabel\')"\n                            :value="true"\n                            @change="truncateChange"></sw-field>\n\n                    <sw-button-process\n                            :isLoading="isLoading"\n                            variant="primary"\n                            @click="onClickImport">\n                        {{ $t(\'wbm-tagmanager.tabs.importButton\') }}\n                    </sw-button-process>\n                </sw-card>\n            </sw-card-view>\n        </template>\n    </sw-page>\n{% endblock %}'},xZel:function(e,t){e.exports='<sw-tree\n        v-if="!isLoadingInitialData"\n        ref="swTree"\n        after-id-property="afterId"\n        child-count-property="childCount"\n        :searchable="false"\n        :disableContextMenu="false"\n        :onChangeRoute="changeProperty"\n        :items="getProperties"\n        @get-tree-items="onGetTreeItems"\n        @delete-element="onDeleteProperty"\n        @drag-end="onUpdatePositions"\n        @editing-end="onEditEnd">\n    <template slot="headline">\n        <div class="sw-tree-actions__headline">\n            <span>{{ $t(\'wbm-tagmanager.properties.title\') }}</span>\n        </div>\n    </template>\n    <template slot="items" slot-scope="{ treeItems, sortable, draggedItem, newElementId, disableContextMenu, onChangeRoute }">\n        <wbm-tree-item\n                v-for="(item, index) in treeItems"\n                :key="item.id"\n                :item="item"\n                :disableContextMenu="disableContextMenu"\n                :onChangeRoute="onChangeRoute"\n                :newElementId="newElementId"></wbm-tree-item>\n    </template>\n</sw-tree>\n\n<sw-loader v-else></sw-loader>'}},[["DdfT","runtime","vendors-node"]]]);