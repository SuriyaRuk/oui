(window["mapsLegacy_bundle_jsonpfunction"]=window["mapsLegacy_bundle_jsonpfunction"]||[]).push([[2],{173:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"OpenSearchDashboardsMap",(function(){return opensearch_dashboards_map_OpenSearchDashboardsMap}));__webpack_require__.d(__webpack_exports__,"ServiceSettings",(function(){return service_settings_ServiceSettings}));__webpack_require__.d(__webpack_exports__,"L",(function(){return L}));var events=__webpack_require__(12);var external_osdSharedDeps_React_=__webpack_require__(0);var external_osdSharedDeps_React_default=__webpack_require__.n(external_osdSharedDeps_React_);var external_osdSharedDeps_ReactDom_=__webpack_require__(27);var external_osdSharedDeps_ReactDom_default=__webpack_require__.n(external_osdSharedDeps_ReactDom_);var external_osdSharedDeps_OsdI18nReact_=__webpack_require__(1);var external_osdSharedDeps_ElasticEui_=__webpack_require__(3);var public_=__webpack_require__(28);const createRegionDeniedWarning=function(){class RegionDeniedWarningOverlay extends external_osdSharedDeps_React_default.a.Component{constructor(props){super(props)}render(){return external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_ElasticEui_["EuiEmptyPrompt"],{iconType:"gisApp",iconColor:null,title:external_osdSharedDeps_React_default.a.createElement("h2",null,"The default Web Map Service is currently not available in your region."),titleSize:"xs",body:external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_React_["Fragment"],null,external_osdSharedDeps_React_default.a.createElement("p",null,"You can configure OpenSearch Dashboards to use a different map server for coordinate maps by modifying the default WMS properties."))})}}return()=>{let messageBlock=document.getElementById("blocker-div");if(!messageBlock){messageBlock=document.createElement("div");messageBlock.id="blocker-div";messageBlock.setAttribute("class","visError leaflet-popup-pane");Array.prototype.forEach.call(document.getElementsByClassName("leaflet-container"),leafletDom=>{external_osdSharedDeps_ReactDom_default.a.render((new RegionDeniedWarningOverlay).render(),leafletDom.appendChild(messageBlock))})}}}();const removeRegionDeniedWarning=function(){return()=>{const childEle=document.getElementById("blocker-div");if(childEle){childEle.parentNode.removeChild(childEle)}}}();const createZoomWarningMsg=function(){let disableZoomMsg=false;const setZoomMsg=boolDisableMsg=>disableZoomMsg=boolDisableMsg;class ZoomWarning extends external_osdSharedDeps_React_default.a.Component{constructor(props){super(props);this.state={disabled:false}}render(){return external_osdSharedDeps_React_default.a.createElement("div",null,external_osdSharedDeps_React_default.a.createElement("p",null,external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_OsdI18nReact_["FormattedMessage"],{id:"maps_legacy.opensearchDashboardsMap.zoomWarning",defaultMessage:"You've reached the maximum number of zoom levels. To zoom all the way in, you can configure your own map server. Please go to { wms } for more information.",values:{wms:external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_ElasticEui_["EuiLink"],{target:"_blank",href:"https://opensearch.org/docs/latest/dashboards/maptiles/"},"Custom WMS Configuration")}})),external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_ElasticEui_["EuiSpacer"],{size:"xs"}),external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_ElasticEui_["EuiButtonEmpty"],{size:"s",flush:"left",isDisabled:this.state.disabled,onClick:()=>{this.setState({disabled:true},()=>this.props.onChange(this.state.disabled))},"data-test-subj":"suppressZoomWarnings"},"Don't show again"))}}const zoomToast={title:"No additional zoom levels",text:Object(public_["toMountPoint"])(external_osdSharedDeps_React_default.a.createElement(ZoomWarning,{onChange:setZoomMsg})),"data-test-subj":"maxZoomWarning"};return(toastService,getZoomLevel,getMaxZoomLevel)=>()=>{const zoomLevel=getZoomLevel();const maxMapZoom=getMaxZoomLevel();if(!disableZoomMsg&&zoomLevel===maxMapZoom){toastService.addDanger(zoomToast)}}}();var external_osdSharedDeps_Jquery_=__webpack_require__(29);var external_osdSharedDeps_Jquery_default=__webpack_require__.n(external_osdSharedDeps_Jquery_);var external_osdSharedDeps_Lodash_=__webpack_require__(26);var external_osdSharedDeps_Lodash_default=__webpack_require__.n(external_osdSharedDeps_Lodash_);var decode_geo_hash=__webpack_require__(6);const defaultMaxPrecision=12;const minGeoHashPixels=16;const calculateZoomToPrecisionMap=maxZoom=>{const zoomPrecisionMap=new Map;for(let zoom=0;zoom<=maxZoom;zoom+=1){if(typeof zoomPrecisionMap.get(zoom)==="number"){continue}const worldPixels=256*Math.pow(2,zoom);zoomPrecisionMap.set(zoom,1);for(let precision=2;precision<=defaultMaxPrecision;precision+=1){const columns=Object(decode_geo_hash["c"])(precision);if(worldPixels/columns>=minGeoHashPixels){zoomPrecisionMap.set(zoom,precision)}else{break}}}return zoomPrecisionMap};function zoomToPrecision(mapZoom,maxPrecision,maxZoom){const zoomPrecisionMap=calculateZoomToPrecisionMap(typeof maxZoom==="number"?maxZoom:21);const precision=zoomPrecisionMap.get(mapZoom);return precision?Math.min(precision,maxPrecision):maxPrecision}var external_osdSharedDeps_OsdI18n_=__webpack_require__(7);var constants_origin=__webpack_require__(11);var opensearch_dashboards_services=__webpack_require__(2);if(!window.hasOwnProperty("L")){__webpack_require__(67);window.L=__webpack_require__(72);window.L.Browser.touch=false;window.L.Browser.pointer=false;__webpack_require__(73);__webpack_require__(75);__webpack_require__(76);__webpack_require__(81);__webpack_require__(82);__webpack_require__(84)}const L=window.L;var external_osdSharedDeps_Theme_=__webpack_require__(30);function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}function makeFitControl(fitContainer,opensearchDashboardsMap){const FitControl=L.Control.extend({options:{position:"topleft"},initialize:function(fitContainer,opensearchDashboardsMap){this._fitContainer=fitContainer;this._opensearchDashboardsMap=opensearchDashboardsMap;this._leafletMap=null},onAdd:function(leafletMap){this._leafletMap=leafletMap;const fitDatBoundsLabel=external_osdSharedDeps_OsdI18n_["i18n"].translate("maps_legacy.opensearchDashboardsMap.leaflet.fitDataBoundsAriaLabel",{defaultMessage:"Fit Data Bounds"});external_osdSharedDeps_Jquery_default()(this._fitContainer).html('<a class="mapButton fa-crop" href="#" title="'.concat(fitDatBoundsLabel,'" aria-label="').concat(fitDatBoundsLabel,'"></a>')).on("click",e=>{e.preventDefault();this._opensearchDashboardsMap.fitToData()});return this._fitContainer},onRemove:function(){external_osdSharedDeps_Jquery_default()(this._fitContainer).off("click")}});return new FitControl(fitContainer,opensearchDashboardsMap)}function makeLegendControl(container,opensearchDashboardsMap,position){const LegendControl=L.Control.extend({options:{position:"topright"},initialize:function(container,opensearchDashboardsMap,position){this._legendContainer=container;this._opensearchDashboardsMap=opensearchDashboardsMap;this.options.position=position},updateContents(){this._legendContainer.empty();const $div=external_osdSharedDeps_Jquery_default()("<div>").addClass("visMapLegend");this._legendContainer.append($div);const layers=this._opensearchDashboardsMap.getLayers();layers.forEach(layer=>layer.appendLegendContents($div))},onAdd:function(){this._layerUpdateHandle=()=>this.updateContents();this._opensearchDashboardsMap.on("layers:update",this._layerUpdateHandle);this.updateContents();return this._legendContainer.get(0)},onRemove:function(){this._opensearchDashboardsMap.removeListener("layers:update",this._layerUpdateHandle);this._legendContainer.empty()}});return new LegendControl(container,opensearchDashboardsMap,position)}class opensearch_dashboards_map_OpenSearchDashboardsMap extends events["EventEmitter"]{constructor(containerNode,options){super();_defineProperty(this,"getZoomLevel",()=>this._leafletMap.getZoom());_defineProperty(this,"getMaxZoomLevel",()=>this._leafletMap.getMaxZoom());_defineProperty(this,"_addMaxZoomMessage",layer=>{const zoomWarningMsg=createZoomWarningMsg(Object(opensearch_dashboards_services["d"])(),this.getZoomLevel,this.getMaxZoomLevel);this._leafletMap.on("zoomend",zoomWarningMsg);this._containerNode.setAttribute("data-test-subj","zoomWarningEnabled");layer.on("remove",()=>{this._leafletMap.off("zoomend",zoomWarningMsg);this._containerNode.removeAttribute("data-test-subj")})});this._containerNode=containerNode;this._leafletBaseLayer=null;this._baseLayerSettings=null;this._baseLayerIsDesaturated=true;this._leafletDrawControl=null;this._leafletFitControl=null;this._leafletLegendControl=null;this._legendPosition="topright";this._layers=[];this._listeners=[];this._showTooltip=false;const leafletOptions={minZoom:options.minZoom,maxZoom:options.maxZoom,center:options.center?options.center:[0,0],zoom:options.zoom?options.zoom:2,renderer:L.canvas(),zoomAnimation:false,zoomControl:options.zoomControl===undefined?true:options.zoomControl};this._leafletMap=L.map(containerNode,leafletOptions);this._leafletMap.attributionControl.setPrefix("");if(!options.scrollWheelZoom){this._leafletMap.scrollWheelZoom.disable()}let previousZoom=this._leafletMap.getZoom();this._leafletMap.on("zoomend",()=>{if(previousZoom!==this._leafletMap.getZoom()){previousZoom=this._leafletMap.getZoom();this.emit("zoomchange")}});this._leafletMap.on("zoomend",()=>this.emit("zoomend"));this._leafletMap.on("dragend",()=>this.emit("dragend"));this._leafletMap.on("zoomend",()=>this._updateExtent());this._leafletMap.on("dragend",()=>this._updateExtent());this._leafletMap.on("mousemove",e=>this._layers.forEach(layer=>layer.movePointer("mousemove",e)));this._leafletMap.on("mouseout",e=>this._layers.forEach(layer=>layer.movePointer("mouseout",e)));this._leafletMap.on("mousedown",e=>this._layers.forEach(layer=>layer.movePointer("mousedown",e)));this._leafletMap.on("mouseup",e=>this._layers.forEach(layer=>layer.movePointer("mouseup",e)));this._leafletMap.on("draw:created",event=>{const drawType=event.layerType;if(drawType==="rectangle"){const bounds=event.layer.getBounds();const southEast=bounds.getSouthEast();const northWest=bounds.getNorthWest();let southEastLng=southEast.lng;if(southEastLng>180){southEastLng-=360}let northWestLng=northWest.lng;if(northWestLng<-180){northWestLng+=360}const southEastLat=southEast.lat;const northWestLat=northWest.lat;if(southEastLat===northWestLat||southEastLng===northWestLng){return}this.emit("drawCreated:rectangle",{bounds:{bottom_right:{lat:southEastLat,lon:southEastLng},top_left:{lat:northWestLat,lon:northWestLng}}})}else if(drawType==="polygon"){const latLongs=event.layer.getLatLngs()[0];this.emit("drawCreated:polygon",{points:latLongs.map(leafletLatLng=>({lat:leafletLatLng.lat,lon:leafletLatLng.lng}))})}});this.resize()}setShowTooltip(showTooltip){this._showTooltip=showTooltip}getLayers(){return this._layers.slice()}addLayer(opensearchDashboardsLayer){const onshowTooltip=event=>{if(!this._showTooltip||!event.content){return}if(!this._popup){this._popup=new L.ResponsivePopup({autoPan:false});this._popup.setLatLng(event.position);this._popup.setContent(event.content);this._leafletMap.openPopup(this._popup)}else{if(!this._popup.getLatLng().equals(event.position)){this._popup.setLatLng(event.position)}if(this._popup.getContent()!==event.content){this._popup.setContent(event.content)}}};opensearchDashboardsLayer.on("showTooltip",onshowTooltip);this._listeners.push({name:"showTooltip",handle:onshowTooltip,layer:opensearchDashboardsLayer});const onHideTooltip=()=>{this._leafletMap.closePopup();this._popup=null};opensearchDashboardsLayer.on("hideTooltip",onHideTooltip);this._listeners.push({name:"hideTooltip",handle:onHideTooltip,layer:opensearchDashboardsLayer});const onStyleChanged=()=>{if(this._leafletLegendControl){this._leafletLegendControl.updateContents()}};opensearchDashboardsLayer.on("styleChanged",onStyleChanged);this._listeners.push({name:"styleChanged",handle:onStyleChanged,layer:opensearchDashboardsLayer});this._layers.push(opensearchDashboardsLayer);opensearchDashboardsLayer.addToLeafletMap(this._leafletMap);this.emit("layers:update");this._addAttributions(opensearchDashboardsLayer.getAttributions())}removeLayer(opensearchDashboardsLayer){if(!opensearchDashboardsLayer){return}this._removeAttributions(opensearchDashboardsLayer.getAttributions());const index=this._layers.indexOf(opensearchDashboardsLayer);if(index>=0){this._layers.splice(index,1);opensearchDashboardsLayer.removeFromLeafletMap(this._leafletMap)}this._listeners.forEach(listener=>{if(listener.layer===opensearchDashboardsLayer){listener.layer.removeListener(listener.name,listener.handle)}});this._layers.forEach(layer=>this._addAttributions(layer.getAttributions()));if(this._baseLayerSettings){this._addAttributions(this._baseLayerSettings.options.attribution)}}_addAttributions(attribution){const attributions=getAttributionArray(attribution);attributions.forEach(attribution=>{this._leafletMap.attributionControl.removeAttribution(attribution);this._leafletMap.attributionControl.addAttribution(attribution)})}_removeAttributions(attribution){const attributions=getAttributionArray(attribution);attributions.forEach(attribution=>{this._leafletMap.attributionControl.removeAttribution(attribution)})}destroy(){if(this._leafletFitControl){this._leafletMap.removeControl(this._leafletFitControl)}if(this._leafletDrawControl){this._leafletMap.removeControl(this._leafletDrawControl)}if(this._leafletLegendControl){this._leafletMap.removeControl(this._leafletLegendControl)}this.setBaseLayer(null);let layer;while(this._layers.length){layer=this._layers.pop();layer.removeFromLeafletMap(this._leafletMap)}this._leafletMap.remove();this._containerNode.innerHTML="";this._listeners.forEach(listener=>listener.layer.removeListener(listener.name,listener.handle))}getCenter(){const center=this._leafletMap.getCenter();return{lon:center.lng,lat:center.lat}}setCenter(latitude,longitude){const latLong=L.latLng(latitude,longitude);if(latLong.equals&&!latLong.equals(this._leafletMap.getCenter())){this._leafletMap.setView(latLong)}}setZoomLevel(zoomLevel){if(this._leafletMap.getZoom()!==zoomLevel){this._leafletMap.setZoom(zoomLevel)}}getGeohashPrecision(){return zoomToPrecision(this._leafletMap.getZoom(),12,this._leafletMap.getMaxZoom())}getLeafletBounds(){return this._leafletMap.getBounds()}getMetersPerPixel(){const pointC=this._leafletMap.latLngToContainerPoint(this._leafletMap.getCenter());const pointX=[pointC.x+1,pointC.y];const pointY=[pointC.x,pointC.y+1];const latLngC=this._leafletMap.containerPointToLatLng(pointC);const latLngX=this._leafletMap.containerPointToLatLng(pointX);const latLngY=this._leafletMap.containerPointToLatLng(pointY);const distanceX=latLngC.distanceTo(latLngX);const distanceY=latLngC.distanceTo(latLngY);return Math.min(distanceX,distanceY)}_getLeafletBounds(resizeOnFail){const boundsRaw=this._leafletMap.getBounds();const bounds=this._leafletMap.wrapLatLngBounds(boundsRaw);if(!bounds){return null}const southEast=bounds.getSouthEast();const northWest=bounds.getNorthWest();if(southEast.lng===northWest.lng||southEast.lat===northWest.lat){if(resizeOnFail){this._leafletMap.invalidateSize();return this._getLeafletBounds(false)}else{return null}}else{return bounds}}getBounds(){const bounds=this._getLeafletBounds(true);if(!bounds){return null}const southEast=bounds.getSouthEast();const northWest=bounds.getNorthWest();const southEastLng=southEast.lng;const northWestLng=northWest.lng;const southEastLat=southEast.lat;const northWestLat=northWest.lat;return{bottom_right:{lat:southEastLat,lon:southEastLng},top_left:{lat:northWestLat,lon:northWestLng}}}setDesaturateBaseLayer(isDesaturated){if(isDesaturated===this._baseLayerIsDesaturated){return}this._baseLayerIsDesaturated=isDesaturated;this._updateDesaturation();if(this._leafletBaseLayer){this._leafletBaseLayer.redraw()}}addDrawControl(){const drawColor=external_osdSharedDeps_Theme_["euiThemeVars"].euiColorInk;const drawOptions={draw:{polyline:false,marker:false,circle:false,rectangle:{shapeOptions:{stroke:false,color:drawColor}},polygon:{shapeOptions:{color:drawColor}},circlemarker:false}};this._leafletDrawControl=new L.Control.Draw(drawOptions);this._leafletMap.addControl(this._leafletDrawControl)}addFitControl(){if(this._leafletFitControl||!this._leafletMap){return}const fitContainer=L.DomUtil.create("div","leaflet-control leaflet-bar leaflet-control-fit");this._leafletFitControl=makeFitControl(fitContainer,this);this._leafletMap.addControl(this._leafletFitControl)}addLegendControl(){if(this._leafletLegendControl||!this._leafletMap){return}this._updateLegend()}setLegendPosition(position){if(this._legendPosition===position){if(!this._leafletLegendControl){this._updateLegend()}}else{this._legendPosition=position;this._updateLegend()}}_updateLegend(){if(this._leafletLegendControl){this._leafletMap.removeControl(this._leafletLegendControl)}const $wrapper=external_osdSharedDeps_Jquery_default()("<div>").addClass("visMapLegend__wrapper");this._leafletLegendControl=makeLegendControl($wrapper,this,this._legendPosition);this._leafletMap.addControl(this._leafletLegendControl)}resize(){this._leafletMap.invalidateSize();this._updateExtent()}setMinZoom(zoom){this._leafletMap.setMinZoom(zoom)}setMaxZoom(zoom){this._leafletMap.setMaxZoom(zoom)}getLeafletBaseLayer(){return this._leafletBaseLayer}setBaseLayer(settings){if(Object(external_osdSharedDeps_Lodash_["isEqual"])(settings,this._baseLayerSettings)){return}if(settings===null){if(this._leafletBaseLayer&&this._leafletMap){this._removeAttributions(this._baseLayerSettings.options.attribution);this._leafletMap.removeLayer(this._leafletBaseLayer);this._leafletBaseLayer=null;this._baseLayerSettings=null}return}this._baseLayerSettings=settings;if(this._leafletBaseLayer){this._leafletMap.removeLayer(this._leafletBaseLayer);this._leafletBaseLayer=null}let baseLayer;if(settings.baseLayerType==="wms"){this._baseLayerSettings.options.attribution=Object(external_osdSharedDeps_Lodash_["escape"])(settings.options.attribution);baseLayer=this._getWMSBaseLayer(settings.options)}else if(settings.baseLayerType==="tms"){baseLayer=this._getTMSBaseLayer(settings.options)}if(baseLayer){baseLayer.on("tileload",()=>this._updateDesaturation());baseLayer.on("load",()=>{this.emit("baseLayer:loaded")});baseLayer.on("loading",()=>{this.emit("baseLayer:loading")});baseLayer.on("tileerror",()=>{if(settings.options.showRegionDeniedWarning){createRegionDeniedWarning()}});this._leafletBaseLayer=baseLayer;if(settings.options.showZoomMessage){baseLayer.on("add",()=>{this._addMaxZoomMessage(baseLayer)})}this._leafletBaseLayer.addTo(this._leafletMap);this._leafletBaseLayer.bringToBack();if(settings.options.minZoom>this._leafletMap.getZoom()){this._leafletMap.setZoom(settings.options.minZoom)}this._addAttributions(settings.options.attribution);this.resize()}}isInside(bucketRectBounds){const mapBounds=this._leafletMap.getBounds();return mapBounds.intersects(bucketRectBounds)}async fitToData(){if(!this._leafletMap){return}const boundsArray=await Promise.all(this._layers.map(async layer=>await layer.getBounds()));let bounds=null;boundsArray.forEach(async b=>{if(bounds){bounds.extend(b)}else{bounds=b}});if(bounds&&bounds.isValid()){this._leafletMap.fitBounds(bounds)}}_getTMSBaseLayer(options){return L.tileLayer(options.url,{minZoom:options.minZoom,maxZoom:options.maxZoom,subdomains:options.subdomains||[]})}_getWMSBaseLayer(options){const wmsOptions={format:options.format||"",layers:options.layers||"",minZoom:options.minZoom,maxZoom:options.maxZoom,styles:options.styles||"",transparent:options.transparent,version:options.version||"1.3.0"};return typeof options.url==="string"&&options.url.length?L.tileLayer.wms(options.url,wmsOptions):null}_updateExtent(){this._layers.forEach(layer=>layer.updateExtent())}_updateDesaturation(){removeRegionDeniedWarning();const tiles=external_osdSharedDeps_Jquery_default()("img.leaflet-tile-loaded");if(Object(external_osdSharedDeps_Lodash_["get"])(this._baseLayerSettings,"options.origin")===constants_origin["a"].EMS){tiles.addClass("filters-off")}else{if(this._baseLayerIsDesaturated){tiles.removeClass("filters-off")}else if(!this._baseLayerIsDesaturated){tiles.addClass("filters-off")}}}persistUiStateForVisualization(visualization){function persistMapStateInUiState(){const uiState=visualization.getUiState();const centerFromUIState=uiState.get("mapCenter");const zoomFromUiState=parseInt(uiState.get("mapZoom"));if(isNaN(zoomFromUiState)||this.getZoomLevel()!==zoomFromUiState){visualization.uiStateVal("mapZoom",this.getZoomLevel())}const centerFromMap=this.getCenter();if(!centerFromUIState||centerFromMap.lon!==centerFromUIState[1]||centerFromMap.lat!==centerFromUIState[0]){visualization.uiStateVal("mapCenter",[centerFromMap.lat,centerFromMap.lon])}}this._leafletMap.on("resize",()=>{visualization.sessionState.mapBounds=this.getBounds()});this._leafletMap.on("load",()=>{visualization.sessionState.mapBounds=this.getBounds()});this.on("dragend",persistMapStateInUiState);this.on("zoomend",persistMapStateInUiState)}useUiStateFromVisualization(visualization){const uiState=visualization.getUiState();const zoomFromUiState=parseInt(uiState.get("mapZoom"));const centerFromUIState=uiState.get("mapCenter");if(!isNaN(zoomFromUiState)){this.setZoomLevel(zoomFromUiState)}if(centerFromUIState){this.setCenter(centerFromUIState[0],centerFromUIState[1])}}}function getAttributionArray(attribution){const attributionString=attribution||"";let attributions=attributionString.split(/\s*\|\s*/);if(attributions.length===1){attributions=attributions[0].split(",")}return attributions}var markdown_it=__webpack_require__(85);var markdown_it_default=__webpack_require__.n(markdown_it);var web=__webpack_require__(66);class opensearch_maps_client_OpenSearchMapsClient extends web["a"]{constructor(_ref){let{osdVersion:osdVersion,manifestServiceUrl:manifestServiceUrl,language:language,landingPageUrl:landingPageUrl,fetchFunction:fetchFunction}=_ref;super({osdVersion:osdVersion,manifestServiceUrl:manifestServiceUrl,language:language,landingPageUrl:landingPageUrl,fetchFunction:fetchFunction});this._queryParams={osd_version:osdVersion,opensearch_tos_agree:true};this._manifestServiceUrl=manifestServiceUrl}async isEnabled(){let result;try{result=await this._fetchWithTimeout(this._manifestServiceUrl)}catch(e){return true}if(result.ok){const resultJson=await result.json();return resultJson.enabled}return false}}function service_settings_defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}const TMS_IN_YML_ID="TMS in config/opensearch_dashboards.yml";const DEFAULT_SERVICE=[{origin:"elastic_maps_service",id:"road_map",minZoom:0,maxZoom:22,attribution:'<a rel="noreferrer noopener" href="https://www.openstreetmap.org/copyright">Map data © OpenStreetMap contributors</a>'}];class service_settings_ServiceSettings{constructor(mapConfig,tilemapsConfig){service_settings_defineProperty(this,"_backfillSettings",fileLayer=>{const format=fileLayer.getDefaultFormatType();const meta=fileLayer.getDefaultFormatMeta();return{name:fileLayer.getDisplayName(),origin:fileLayer.getOrigin(),id:fileLayer.getId(),created_at:fileLayer.getCreatedAt(),attribution:getAttributionString(fileLayer),fields:fileLayer.getFieldsInLanguage(),format:format,meta:meta}});this._mapConfig=mapConfig;this._tilemapsConfig=tilemapsConfig;this._hasTmsConfigured=typeof tilemapsConfig.url==="string"&&tilemapsConfig.url!=="";this._showZoomMessage=true;this._showRegionDeniedWarning=this._mapConfig.showRegionDeniedWarning;this._emsClient=null;this._opensearchMapsClient=new opensearch_maps_client_OpenSearchMapsClient({language:external_osdSharedDeps_OsdI18n_["i18n"].getLocale(),appVersion:Object(opensearch_dashboards_services["c"])(),appName:"opensearch-dashboards",fileApiUrl:this._mapConfig.emsFileApiUrl,tileApiUrl:this._mapConfig.emsTileApiUrl,landingPageUrl:"",manifestServiceUrl:this._mapConfig.opensearchManifestServiceUrl,fetchFunction:function(){return fetch(...arguments)}});this.getTMSOptions()}getTMSOptions(){const markdownIt=new markdown_it_default.a({html:false,linkify:true});this.tmsOptionsFromConfig=external_osdSharedDeps_Lodash_default.a.assign({},this._tilemapsConfig.options,{attribution:external_osdSharedDeps_Lodash_default.a.escape(markdownIt.render(this._tilemapsConfig.options.attribution||"")),url:this._tilemapsConfig.url})}shouldShowRegionDeniedWarning(){return this._showRegionDeniedWarning}shouldShowZoomMessage(_ref){let{origin:origin}=_ref;return origin===constants_origin["a"].EMS&&this._showZoomMessage}enableZoomMessage(){this._showZoomMessage=true}disableZoomMessage(){this._showZoomMessage=false}__debugStubManifestCalls(manifestRetrieval){this._emsClient=this._opensearchMapsClient;const oldGetManifest=this._emsClient.getManifest;this._emsClient.getManifest=manifestRetrieval;return{removeStub:()=>{delete this._emsClient.getManifest;if(this._emsClient.getManifest!==oldGetManifest){this._emsClient.getManifest=oldGetManifest}}}}async _setMapServices(){if(this._emsClient){return}const useOpenSearchMaps=await this._opensearchMapsClient.isEnabled();if(useOpenSearchMaps){this._emsClient=this._opensearchMapsClient}else{this._emsClient=new web["a"]({language:external_osdSharedDeps_OsdI18n_["i18n"].getLocale(),appVersion:Object(opensearch_dashboards_services["c"])(),appName:"opensearch-dashboards",fileApiUrl:this._mapConfig.emsFileApiUrl,tileApiUrl:this._mapConfig.emsTileApiUrl,landingPageUrl:this._mapConfig.emsLandingPageUrl,fetchFunction:function(){return fetch(...arguments)}})}}async getFileLayers(){if(!this._mapConfig.includeOpenSearchMapsService){return[]}await this._setMapServices();try{const fileLayers=await this._emsClient.getFileLayers();return fileLayers.map(this._backfillSettings)}catch(e){return[]}}async getTMSServices(){let allServices=[];if(this._hasTmsConfigured){const tmsService=external_osdSharedDeps_Lodash_default.a.cloneDeep(this.tmsOptionsFromConfig);tmsService.id=TMS_IN_YML_ID;tmsService.origin=constants_origin["a"].OPENSEARCH_DASHBOARDS_YML;allServices.push(tmsService)}await this._setMapServices();if(this._mapConfig.includeOpenSearchMapsService){let servicesFromManifest=[];try{servicesFromManifest=await this._emsClient.getTMSServices()}catch(e){return DEFAULT_SERVICE}const strippedServiceFromManifest=await Promise.all(servicesFromManifest.filter(tmsService=>tmsService.getId()===this._mapConfig.emsTileLayerId.bright).map(async tmsService=>({origin:tmsService.getOrigin(),id:tmsService.getId(),minZoom:await tmsService.getMinZoom(),maxZoom:await tmsService.getMaxZoom(),attribution:getAttributionString(tmsService)})));allServices=allServices.concat(strippedServiceFromManifest)}return allServices}setQueryParams(additionalQueryParams){this._emsClient.addQueryParams(additionalQueryParams)}async getFileLayerFromConfig(fileLayerConfig){let fileLayers=[];try{fileLayers=await this._emsClient.getFileLayers();return fileLayers.find(fileLayer=>{const hasIdByName=fileLayer.hasId(fileLayerConfig.name);const hasIdById=fileLayer.hasId(fileLayerConfig.id);return hasIdByName||hasIdById})}catch(err){return null}}async getEMSHotLink(fileLayerConfig){await this._setMapServices();const layer=await this.getFileLayerFromConfig(fileLayerConfig);return layer?layer.getEMSHotLink():null}async loadFileLayerConfig(fileLayerConfig){const fileLayer=await this.getFileLayerFromConfig(fileLayerConfig);return fileLayer?this._backfillSettings(fileLayer):null}async _getAttributesForEMSTMSLayer(isDesaturated,isDarkMode){await this._setMapServices();let tmsServices=[];try{tmsServices=await this._emsClient.getTMSServices()}catch(e){return DEFAULT_SERVICE}const emsTileLayerId=this._mapConfig.emsTileLayerId;let serviceId;if(isDarkMode){serviceId=emsTileLayerId.dark}else{if(isDesaturated){serviceId=emsTileLayerId.desaturated}else{serviceId=emsTileLayerId.bright}}const tmsService=tmsServices.find(service=>service.getId()===serviceId);return{url:await tmsService.getUrlTemplate(),minZoom:await tmsService.getMinZoom(),maxZoom:await tmsService.getMaxZoom(),attribution:getAttributionString(tmsService),origin:constants_origin["a"].EMS}}async getAttributesForTMSLayer(tmsServiceConfig,isDesaturated,isDarkMode){if(tmsServiceConfig.origin===constants_origin["a"].EMS){return this._getAttributesForEMSTMSLayer(isDesaturated,isDarkMode)}else if(tmsServiceConfig.origin===constants_origin["a"].OPENSEARCH_DASHBOARDS_YML){const attrs=external_osdSharedDeps_Lodash_default.a.pick(this._tilemapsConfig,["url","minzoom","maxzoom","attribution"]);return{...attrs,...{origin:constants_origin["a"].OPENSEARCH_DASHBOARDS_YML}}}else{if(tmsServiceConfig.id===TMS_IN_YML_ID){const attrs=external_osdSharedDeps_Lodash_default.a.pick(this._tilemapsConfig,["url","minzoom","maxzoom","attribution"]);return{...attrs,...{origin:constants_origin["a"].OPENSEARCH_DASHBOARDS_YML}}}else{return this._getAttributesForEMSTMSLayer(isDesaturated,isDarkMode)}}}async _getFileUrlFromEMS(fileLayerConfig){await this._setMapServices();const fileLayers=await this._emsClient.getFileLayers();const layer=fileLayers.find(fileLayer=>{const hasIdByName=fileLayer.hasId(fileLayerConfig.name);const hasIdById=fileLayer.hasId(fileLayerConfig.id);return hasIdByName||hasIdById});if(layer){return layer.getDefaultFormatUrl()}else{throw new Error("File  ".concat(fileLayerConfig.name," not recognized"))}}async getUrlForRegionLayer(fileLayerConfig){let url;if(fileLayerConfig.origin===constants_origin["a"].EMS){url=this._getFileUrlFromEMS(fileLayerConfig)}else if(fileLayerConfig.layerId&&fileLayerConfig.layerId.startsWith("".concat(constants_origin["a"].EMS,"."))){url=this._getFileUrlFromEMS(fileLayerConfig)}else if(fileLayerConfig.layerId&&fileLayerConfig.layerId.startsWith("".concat(constants_origin["a"].OPENSEARCH_DASHBOARDS_YML,"."))){url=fileLayerConfig.url}else{url=fileLayerConfig.url}return url}async getJsonForRegionLayer(fileLayerConfig){const url=await this.getUrlForRegionLayer(fileLayerConfig);const response=await fetch(url);return await response.json()}}function getAttributionString(emsService){const attributions=emsService.getAttributions();const attributionSnippets=attributions.map(attribution=>{const anchorTag=document.createElement("a");anchorTag.setAttribute("rel","noreferrer noopener");if(attribution.url.startsWith("http://")||attribution.url.startsWith("https://")){anchorTag.setAttribute("href",attribution.url)}anchorTag.textContent=attribution.label;return anchorTag.outerHTML});return attributionSnippets.join(" | ");//!!!this is the current convention used in OpenSearch Dashboards
}}}]);