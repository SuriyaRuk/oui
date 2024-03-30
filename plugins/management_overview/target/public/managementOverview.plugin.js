(function(modules){function webpackJsonpCallback(data){var chunkIds=data[0];var moreModules=data[1];var moduleId,chunkId,i=0,resolves=[];for(;i<chunkIds.length;i++){chunkId=chunkIds[i];if(Object.prototype.hasOwnProperty.call(installedChunks,chunkId)&&installedChunks[chunkId]){resolves.push(installedChunks[chunkId][0])}installedChunks[chunkId]=0}for(moduleId in moreModules){if(Object.prototype.hasOwnProperty.call(moreModules,moduleId)){modules[moduleId]=moreModules[moduleId]}}if(parentJsonpFunction)parentJsonpFunction(data);while(resolves.length){resolves.shift()()}}var installedModules={};var installedChunks={0:0};function jsonpScriptSrc(chunkId){return __webpack_require__.p+"managementOverview.chunk."+chunkId+".js"}function __webpack_require__(moduleId){if(installedModules[moduleId]){return installedModules[moduleId].exports}var module=installedModules[moduleId]={i:moduleId,l:false,exports:{}};modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);module.l=true;return module.exports}__webpack_require__.e=function requireEnsure(chunkId){var promises=[];var installedChunkData=installedChunks[chunkId];if(installedChunkData!==0){if(installedChunkData){promises.push(installedChunkData[2])}else{var promise=new Promise((function(resolve,reject){installedChunkData=installedChunks[chunkId]=[resolve,reject]}));promises.push(installedChunkData[2]=promise);var script=document.createElement("script");var onScriptComplete;script.charset="utf-8";script.timeout=120;if(__webpack_require__.nc){script.setAttribute("nonce",__webpack_require__.nc)}script.src=jsonpScriptSrc(chunkId);var error=new Error;onScriptComplete=function(event){script.onerror=script.onload=null;clearTimeout(timeout);var chunk=installedChunks[chunkId];if(chunk!==0){if(chunk){var errorType=event&&(event.type==="load"?"missing":event.type);var realSrc=event&&event.target&&event.target.src;error.message="Loading chunk "+chunkId+" failed.\n("+errorType+": "+realSrc+")";error.name="ChunkLoadError";error.type=errorType;error.request=realSrc;chunk[1](error)}installedChunks[chunkId]=undefined}};var timeout=setTimeout((function(){onScriptComplete({type:"timeout",target:script})}),12e4);script.onerror=script.onload=onScriptComplete;document.head.appendChild(script)}}return Promise.all(promises)};__webpack_require__.m=modules;__webpack_require__.c=installedModules;__webpack_require__.d=function(exports,name,getter){if(!__webpack_require__.o(exports,name)){Object.defineProperty(exports,name,{enumerable:true,get:getter})}};__webpack_require__.r=function(exports){if(typeof Symbol!=="undefined"&&Symbol.toStringTag){Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"})}Object.defineProperty(exports,"__esModule",{value:true})};__webpack_require__.t=function(value,mode){if(mode&1)value=__webpack_require__(value);if(mode&8)return value;if(mode&4&&typeof value==="object"&&value&&value.__esModule)return value;var ns=Object.create(null);__webpack_require__.r(ns);Object.defineProperty(ns,"default",{enumerable:true,value:value});if(mode&2&&typeof value!="string")for(var key in value)__webpack_require__.d(ns,key,function(key){return value[key]}.bind(null,key));return ns};__webpack_require__.n=function(module){var getter=module&&module.__esModule?function getDefault(){return module["default"]}:function getModuleExports(){return module};__webpack_require__.d(getter,"a",getter);return getter};__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)};__webpack_require__.p="";__webpack_require__.oe=function(err){console.error(err);throw err};var jsonpArray=window["managementOverview_bundle_jsonpfunction"]=window["managementOverview_bundle_jsonpfunction"]||[];var oldJsonpFunction=jsonpArray.push.bind(jsonpArray);jsonpArray.push=webpackJsonpCallback;jsonpArray=jsonpArray.slice();for(var i=0;i<jsonpArray.length;i++)webpackJsonpCallback(jsonpArray[i]);var parentJsonpFunction=oldJsonpFunction;return __webpack_require__(__webpack_require__.s=3)})([function(module,exports){module.exports=__osdSharedDeps__.OsdI18n},function(module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var ns=__osdBundles__.get("entry/core/public");Object.defineProperties(__webpack_exports__,Object.getOwnPropertyDescriptors(ns))},function(module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var ns=__osdBundles__.get("plugin/home/public");Object.defineProperties(__webpack_exports__,Object.getOwnPropertyDescriptors(ns))},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _node_modules_val_loader_dist_cjs_js_key_managementOverview_osd_ui_shared_deps_public_path_module_creator_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(4);var _node_modules_val_loader_dist_cjs_js_key_managementOverview_osd_ui_shared_deps_public_path_module_creator_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_val_loader_dist_cjs_js_key_managementOverview_osd_ui_shared_deps_public_path_module_creator_js__WEBPACK_IMPORTED_MODULE_0__);__osdBundles__.define("plugin/managementOverview/public",__webpack_require__,5)},function(module,exports,__webpack_require__){__webpack_require__.p=window.__osdPublicPath__["managementOverview"]},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"OverviewApp",(function(){return undefined}));__webpack_require__.d(__webpack_exports__,"ManagementOverViewPluginSetup",(function(){return undefined}));__webpack_require__.d(__webpack_exports__,"ManagementOverViewPluginStart",(function(){return undefined}));__webpack_require__.d(__webpack_exports__,"plugin",(function(){return public_plugin}));var external_osdSharedDeps_OsdI18n_=__webpack_require__(0);var public_=__webpack_require__(1);var home_public_=__webpack_require__(2);const MANAGEMENT_OVERVIEW_PLUGIN_ID="opensearch_management_overview";function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}class plugin_ManagementOverViewPlugin{constructor(){_defineProperty(this,"overviewApps",new Map)}getSortedOverviewApps(){return[...this.overviewApps.values()].sort((a,b)=>a.order-b.order)}setup(coreSetup,_ref){let{home:home}=_ref;const{application:application,getStartServices:getStartServices}=coreSetup;if(home){home.featureCatalogue.register({id:MANAGEMENT_OVERVIEW_PLUGIN_ID,title:external_osdSharedDeps_OsdI18n_["i18n"].translate("management.stackManagement.managementLabel",{defaultMessage:"Management"}),description:external_osdSharedDeps_OsdI18n_["i18n"].translate("management.stackManagement.managementDescription",{defaultMessage:"Your center location for managing the OpenSearch Stack."}),icon:"managementApp",path:"/app/".concat(MANAGEMENT_OVERVIEW_PLUGIN_ID),showOnHomePage:false,category:home_public_["FeatureCatalogueCategory"].ADMIN})}application.register({id:MANAGEMENT_OVERVIEW_PLUGIN_ID,title:external_osdSharedDeps_OsdI18n_["i18n"].translate("management.overview.overviewTitle",{defaultMessage:"Overview"}),icon:"/ui/logos/opensearch_mark.svg",order:9e3,category:public_["DEFAULT_APP_CATEGORIES"].management,mount:async params=>{const{element:element}=params;const[core]=await getStartServices();const overviewApps=this.getSortedOverviewApps();const{renderApp:renderApp}=await __webpack_require__.e(1).then(__webpack_require__.bind(null,13));return renderApp(core,overviewApps,element)}});return{register:app=>{if(this.overviewApps.has(app.id)){throw new Error("Management overview App tool with id [".concat(app.id,"] has already been registered. Use a unique id."))}this.overviewApps.set(app.id,app)}}}start(core){return{}}}const public_plugin=()=>new plugin_ManagementOverViewPlugin},function(module,exports){module.exports=__osdSharedDeps__.React},function(module,exports){module.exports=__osdSharedDeps__.ElasticEui},function(module,exports){module.exports=__osdSharedDeps__.ReactDom},function(module,exports){module.exports=__osdSharedDeps__.OsdI18nReact},function(module,exports){module.exports=__osdSharedDeps__.TsLib}]);