(window["devTools_bundle_jsonpfunction"]=window["devTools_bundle_jsonpfunction"]||[]).push([[2],{155:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"renderApp",(function(){return renderApp}));var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(18);var react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);var react_dom__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(20);var react_dom__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);var react_router_dom__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(21);var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);var _elastic_eui__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(22);var _elastic_eui__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__);var _osd_i18n_react__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(23);var _osd_i18n_react__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_osd_i18n_react__WEBPACK_IMPORTED_MODULE_4__);var _osd_i18n__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(2);var _osd_i18n__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(_osd_i18n__WEBPACK_IMPORTED_MODULE_5__);var react_use__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(52);var react_use__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(react_use__WEBPACK_IMPORTED_MODULE_6__);var _data_source_management_public_components_utils__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(24);var _data_source_management_public_components_utils__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(_data_source_management_public_components_utils__WEBPACK_IMPORTED_MODULE_7__);function DevToolsWrapper(_ref){let{devTools:devTools,activeDevTool:activeDevTool,updateRoute:updateRoute,savedObjects:savedObjects,notifications:{toasts:toasts},dataSourceEnabled:dataSourceEnabled}=_ref;const mountedTool=Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);const[dataSources,setDataSources]=Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);const[selectedOptions,setSelectedOptions]=Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(()=>()=>{if(mountedTool.current){mountedTool.current.unmountHandler()}},[]);Object(react_use__WEBPACK_IMPORTED_MODULE_6__["useEffectOnce"])(()=>{fetchDataSources()});const fetchDataSources=()=>{Object(_data_source_management_public_components_utils__WEBPACK_IMPORTED_MODULE_7__["getDataSources"])(savedObjects.client).then(fetchedDataSources=>{if(fetchedDataSources!==null&&fetchedDataSources!==void 0&&fetchedDataSources.length){const dataSourceOptions=fetchedDataSources.map(dataSource=>({id:dataSource.id,label:dataSource.title}));setDataSources(dataSourceOptions)}}).catch(()=>{toasts.addDanger(_osd_i18n__WEBPACK_IMPORTED_MODULE_5__["i18n"].translate("devTools.devToolWrapper.fetchDataSourceError",{defaultMessage:"Unable to fetch existing data sources"}))})};const onChange=async e=>{const dataSourceId=e[0]?e[0].id:undefined;setSelectedOptions(e);await remount(mountedTool.current.mountpoint,dataSourceId)};const remount=async(mountPoint,dataSourceId)=>{if(mountedTool.current){mountedTool.current.unmountHandler()}const params={element:mountPoint,appBasePath:"",onAppLeave:()=>undefined,setHeaderActionMenu:()=>undefined,history:{},dataSourceId:dataSourceId};const unmountHandler=await activeDevTool.mount(params);mountedTool.current={devTool:activeDevTool,mountpoint:mountPoint,unmountHandler:unmountHandler}};return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main",{className:"devApp"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiTabs"],{className:"devAppTabs"},devTools.map(currentDevTool=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiToolTip"],{content:currentDevTool.tooltipContent,key:currentDevTool.id},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiTab"],{disabled:currentDevTool.isDisabled(),isSelected:currentDevTool===activeDevTool,onClick:()=>{if(!currentDevTool.isDisabled()){updateRoute("/".concat(currentDevTool.id))}}},currentDevTool.title))),dataSourceEnabled?react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",{className:"devAppDataSourcePicker"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiComboBox"],{"aria-label":_osd_i18n__WEBPACK_IMPORTED_MODULE_5__["i18n"].translate("devTools.devToolWrapper.DataSourceComboBoxAriaLabel",{defaultMessage:"Select a Data Source"}),placeholder:_osd_i18n__WEBPACK_IMPORTED_MODULE_5__["i18n"].translate("devTools.devToolWrapper.DataSourceComboBoxPlaceholder",{defaultMessage:"Select a Data Source"}),singleSelection:{asPlainText:true},options:dataSources,selectedOptions:selectedOptions,onChange:onChange,prepend:"DataSource",compressed:true,isDisabled:!dataSourceEnabled})):null),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",{className:"devApp__container",role:"tabpanel","data-test-subj":activeDevTool.id,ref:async element=>{if(element&&(mountedTool.current===null||mountedTool.current.devTool!==activeDevTool||mountedTool.current.mountpoint!==element)){await remount(element)}}}))}function redirectOnMissingCapabilities(application){if(!application.capabilities.dev_tools.show){application.navigateToApp("home");return true}return false}function setBadge(application,chrome){if(application.capabilities.dev_tools.save){return}chrome.setBadge({text:_osd_i18n__WEBPACK_IMPORTED_MODULE_5__["i18n"].translate("devTools.badge.readOnly.text",{defaultMessage:"Read only"}),tooltip:_osd_i18n__WEBPACK_IMPORTED_MODULE_5__["i18n"].translate("devTools.badge.readOnly.tooltip",{defaultMessage:"Unable to save"}),iconType:"glasses"})}function setTitle(chrome){chrome.docTitle.change(_osd_i18n__WEBPACK_IMPORTED_MODULE_5__["i18n"].translate("devTools.pageTitle",{defaultMessage:"Dev Tools"}))}function setBreadcrumbs(chrome){chrome.setBreadcrumbs([{text:_osd_i18n__WEBPACK_IMPORTED_MODULE_5__["i18n"].translate("devTools.k7BreadcrumbsDevToolsLabel",{defaultMessage:"Dev Tools"}),href:"#/"}])}function renderApp(_ref2,element,history,devTools,_ref3){let{application:application,chrome:chrome,savedObjects:savedObjects,notifications:notifications}=_ref2;let{dataSource:dataSource}=_ref3;const dataSourceEnabled=!!dataSource;if(redirectOnMissingCapabilities(application)){return()=>{}}setBadge(application,chrome);setBreadcrumbs(chrome);setTitle(chrome);react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_osd_i18n_react__WEBPACK_IMPORTED_MODULE_4__["I18nProvider"],null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["HashRouter"],null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Switch"],null,devTools.filter(devTool=>!devTool.isDisabled()).map(devTool=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"],{key:devTool.id,path:"/".concat(devTool.id),exact:!devTool.enableRouting,render:props=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DevToolsWrapper,{updateRoute:props.history.push,activeDevTool:devTool,devTools:devTools,savedObjects:savedObjects,notifications:notifications,dataSourceEnabled:dataSourceEnabled})})),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"],{path:"/"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Redirect"],{to:"/".concat(devTools[0].id)}))))),element);const unlisten=history.listen(()=>{window.dispatchEvent(new HashChangeEvent("hashchange"))});return()=>{chrome.docTitle.reset();react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.unmountComponentAtNode(element);unlisten()}}}}]);