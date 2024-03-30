(function(modules){function webpackJsonpCallback(data){var chunkIds=data[0];var moreModules=data[1];var moduleId,chunkId,i=0,resolves=[];for(;i<chunkIds.length;i++){chunkId=chunkIds[i];if(Object.prototype.hasOwnProperty.call(installedChunks,chunkId)&&installedChunks[chunkId]){resolves.push(installedChunks[chunkId][0])}installedChunks[chunkId]=0}for(moduleId in moreModules){if(Object.prototype.hasOwnProperty.call(moreModules,moduleId)){modules[moduleId]=moreModules[moduleId]}}if(parentJsonpFunction)parentJsonpFunction(data);while(resolves.length){resolves.shift()()}}var installedModules={};var installedChunks={0:0};function jsonpScriptSrc(chunkId){return __webpack_require__.p+"visualize.chunk."+chunkId+".js"}function __webpack_require__(moduleId){if(installedModules[moduleId]){return installedModules[moduleId].exports}var module=installedModules[moduleId]={i:moduleId,l:false,exports:{}};modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);module.l=true;return module.exports}__webpack_require__.e=function requireEnsure(chunkId){var promises=[];var installedChunkData=installedChunks[chunkId];if(installedChunkData!==0){if(installedChunkData){promises.push(installedChunkData[2])}else{var promise=new Promise((function(resolve,reject){installedChunkData=installedChunks[chunkId]=[resolve,reject]}));promises.push(installedChunkData[2]=promise);var script=document.createElement("script");var onScriptComplete;script.charset="utf-8";script.timeout=120;if(__webpack_require__.nc){script.setAttribute("nonce",__webpack_require__.nc)}script.src=jsonpScriptSrc(chunkId);var error=new Error;onScriptComplete=function(event){script.onerror=script.onload=null;clearTimeout(timeout);var chunk=installedChunks[chunkId];if(chunk!==0){if(chunk){var errorType=event&&(event.type==="load"?"missing":event.type);var realSrc=event&&event.target&&event.target.src;error.message="Loading chunk "+chunkId+" failed.\n("+errorType+": "+realSrc+")";error.name="ChunkLoadError";error.type=errorType;error.request=realSrc;chunk[1](error)}installedChunks[chunkId]=undefined}};var timeout=setTimeout((function(){onScriptComplete({type:"timeout",target:script})}),12e4);script.onerror=script.onload=onScriptComplete;document.head.appendChild(script)}}return Promise.all(promises)};__webpack_require__.m=modules;__webpack_require__.c=installedModules;__webpack_require__.d=function(exports,name,getter){if(!__webpack_require__.o(exports,name)){Object.defineProperty(exports,name,{enumerable:true,get:getter})}};__webpack_require__.r=function(exports){if(typeof Symbol!=="undefined"&&Symbol.toStringTag){Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"})}Object.defineProperty(exports,"__esModule",{value:true})};__webpack_require__.t=function(value,mode){if(mode&1)value=__webpack_require__(value);if(mode&8)return value;if(mode&4&&typeof value==="object"&&value&&value.__esModule)return value;var ns=Object.create(null);__webpack_require__.r(ns);Object.defineProperty(ns,"default",{enumerable:true,value:value});if(mode&2&&typeof value!="string")for(var key in value)__webpack_require__.d(ns,key,function(key){return value[key]}.bind(null,key));return ns};__webpack_require__.n=function(module){var getter=module&&module.__esModule?function getDefault(){return module["default"]}:function getModuleExports(){return module};__webpack_require__.d(getter,"a",getter);return getter};__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)};__webpack_require__.p="";__webpack_require__.oe=function(err){console.error(err);throw err};var jsonpArray=window["visualize_bundle_jsonpfunction"]=window["visualize_bundle_jsonpfunction"]||[];var oldJsonpFunction=jsonpArray.push.bind(jsonpArray);jsonpArray.push=webpackJsonpCallback;jsonpArray=jsonpArray.slice();for(var i=0;i<jsonpArray.length;i++)webpackJsonpCallback(jsonpArray[i]);var parentJsonpFunction=oldJsonpFunction;return __webpack_require__(__webpack_require__.s=11)})([function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"e",(function(){return getUISettings}));__webpack_require__.d(__webpack_exports__,"k",(function(){return setUISettings}));__webpack_require__.d(__webpack_exports__,"a",(function(){return getApplication}));__webpack_require__.d(__webpack_exports__,"g",(function(){return setApplication}));__webpack_require__.d(__webpack_exports__,"d",(function(){return getShareService}));__webpack_require__.d(__webpack_exports__,"j",(function(){return setShareService}));__webpack_require__.d(__webpack_exports__,"b",(function(){return getIndexPatterns}));__webpack_require__.d(__webpack_exports__,"h",(function(){return setIndexPatterns}));__webpack_require__.d(__webpack_exports__,"c",(function(){return getQueryService}));__webpack_require__.d(__webpack_exports__,"i",(function(){return setQueryService}));__webpack_require__.d(__webpack_exports__,"f",(function(){return getUiActions}));__webpack_require__.d(__webpack_exports__,"l",(function(){return setUiActions}));var _plugins_opensearch_dashboards_utils_public__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(1);var _plugins_opensearch_dashboards_utils_public__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_plugins_opensearch_dashboards_utils_public__WEBPACK_IMPORTED_MODULE_0__);const[getUISettings,setUISettings]=Object(_plugins_opensearch_dashboards_utils_public__WEBPACK_IMPORTED_MODULE_0__["createGetterSetter"])("UISettings");const[getApplication,setApplication]=Object(_plugins_opensearch_dashboards_utils_public__WEBPACK_IMPORTED_MODULE_0__["createGetterSetter"])("Application");const[getShareService,setShareService]=Object(_plugins_opensearch_dashboards_utils_public__WEBPACK_IMPORTED_MODULE_0__["createGetterSetter"])("Share");const[getIndexPatterns,setIndexPatterns]=Object(_plugins_opensearch_dashboards_utils_public__WEBPACK_IMPORTED_MODULE_0__["createGetterSetter"])("IndexPatterns");const[getQueryService,setQueryService]=Object(_plugins_opensearch_dashboards_utils_public__WEBPACK_IMPORTED_MODULE_0__["createGetterSetter"])("Query");const[getUiActions,setUiActions]=Object(_plugins_opensearch_dashboards_utils_public__WEBPACK_IMPORTED_MODULE_0__["createGetterSetter"])("UIActions")},function(module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var ns=__osdBundles__.get("plugin/opensearchDashboardsUtils/public");Object.defineProperties(__webpack_exports__,Object.getOwnPropertyDescriptors(ns))},function(module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var ns=__osdBundles__.get("plugin/uiActions/public");Object.defineProperties(__webpack_exports__,Object.getOwnPropertyDescriptors(ns))},function(module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var ns=__osdBundles__.get("plugin/data/public");Object.defineProperties(__webpack_exports__,Object.getOwnPropertyDescriptors(ns))},function(module,exports){module.exports=__osdSharedDeps__.OsdI18n},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return APP_NAME}));__webpack_require__.d(__webpack_exports__,"b",(function(){return VisualizeConstants}));const APP_NAME="visualize";const VisualizeConstants={LANDING_PAGE_PATH:"/",WIZARD_STEP_1_PAGE_PATH:"/new",WIZARD_STEP_2_PAGE_PATH:"/new/configure",CREATE_PATH:"/create",EDIT_PATH:"/edit",EDIT_BY_VALUE_PATH:"/edit_by_value"}},function(module,exports){module.exports=__osdSharedDeps__.RxjsOperators},function(module,exports){module.exports=__osdSharedDeps__.Rxjs},function(module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var ns=__osdBundles__.get("plugin/home/public");Object.defineProperties(__webpack_exports__,Object.getOwnPropertyDescriptors(ns))},function(module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var ns=__osdBundles__.get("entry/core/public");Object.defineProperties(__webpack_exports__,Object.getOwnPropertyDescriptors(ns))},function(module,exports,__webpack_require__){"use strict";if(true){module.exports=__webpack_require__(13)}else{}},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _node_modules_val_loader_dist_cjs_js_key_visualize_osd_ui_shared_deps_public_path_module_creator_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(12);var _node_modules_val_loader_dist_cjs_js_key_visualize_osd_ui_shared_deps_public_path_module_creator_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_val_loader_dist_cjs_js_key_visualize_osd_ui_shared_deps_public_path_module_creator_js__WEBPACK_IMPORTED_MODULE_0__);__osdBundles__.define("plugin/visualize/public",__webpack_require__,20)},function(module,exports,__webpack_require__){__webpack_require__.p=window.__osdPublicPath__["visualize"]},function(module,exports,__webpack_require__){"use strict";function _interopDefault(t){return t&&"object"==typeof t&&"default"in t?t.default:t}Object.defineProperty(exports,"__esModule",{value:!0});var resolvePathname=_interopDefault(__webpack_require__(14)),valueEqual=_interopDefault(__webpack_require__(16));__webpack_require__(18);var invariant=_interopDefault(__webpack_require__(19));function _extends(){return(_extends=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a])}return t}).apply(this,arguments)}function addLeadingSlash(t){return"/"===t.charAt(0)?t:"/"+t}function stripLeadingSlash(t){return"/"===t.charAt(0)?t.substr(1):t}function hasBasename(t,n){return 0===t.toLowerCase().indexOf(n.toLowerCase())&&-1!=="/?#".indexOf(t.charAt(n.length))}function stripBasename(t,n){return hasBasename(t,n)?t.substr(n.length):t}function stripTrailingSlash(t){return"/"===t.charAt(t.length-1)?t.slice(0,-1):t}function parsePath(t){var n=t||"/",e="",a="",r=n.indexOf("#");-1!==r&&(a=n.substr(r),n=n.substr(0,r));var o=n.indexOf("?");return-1!==o&&(e=n.substr(o),n=n.substr(0,o)),{pathname:n,search:"?"===e?"":e,hash:"#"===a?"":a}}function createPath(t){var n=t.pathname,e=t.search,a=t.hash,r=n||"/";return e&&"?"!==e&&(r+="?"===e.charAt(0)?e:"?"+e),a&&"#"!==a&&(r+="#"===a.charAt(0)?a:"#"+a),r}function createLocation(t,n,e,a){var r;"string"==typeof t?(r=parsePath(t)).state=n:(void 0===(r=_extends({},t)).pathname&&(r.pathname=""),r.search?"?"!==r.search.charAt(0)&&(r.search="?"+r.search):r.search="",r.hash?"#"!==r.hash.charAt(0)&&(r.hash="#"+r.hash):r.hash="",void 0!==n&&void 0===r.state&&(r.state=n));try{r.pathname=decodeURI(r.pathname)}catch(t){throw t instanceof URIError?new URIError('Pathname "'+r.pathname+'" could not be decoded. This is likely caused by an invalid percent-encoding.'):t}return e&&(r.key=e),a?r.pathname?"/"!==r.pathname.charAt(0)&&(r.pathname=resolvePathname(r.pathname,a.pathname)):r.pathname=a.pathname:r.pathname||(r.pathname="/"),r}function locationsAreEqual(t,n){return t.pathname===n.pathname&&t.search===n.search&&t.hash===n.hash&&t.key===n.key&&valueEqual(t.state,n.state)}function createTransitionManager(){var o=null;var a=[];return{setPrompt:function(t){return o=t,function(){o===t&&(o=null)}},confirmTransitionTo:function(t,n,e,a){if(null!=o){var r="function"==typeof o?o(t,n):o;"string"==typeof r?"function"==typeof e?e(r,a):a(!0):a(!1!==r)}else a(!0)},appendListener:function(t){var n=!0;function e(){n&&t.apply(void 0,arguments)}return a.push(e),function(){n=!1,a=a.filter((function(t){return t!==e}))}},notifyListeners:function(){for(var t=arguments.length,n=new Array(t),e=0;e<t;e++)n[e]=arguments[e];a.forEach((function(t){return t.apply(void 0,n)}))}}}var canUseDOM=!("undefined"==typeof window||!window.document||!window.document.createElement);function getConfirmation(t,n){n(window.confirm(t))}function supportsHistory(){var t=window.navigator.userAgent;return(-1===t.indexOf("Android 2.")&&-1===t.indexOf("Android 4.0")||-1===t.indexOf("Mobile Safari")||-1!==t.indexOf("Chrome")||-1!==t.indexOf("Windows Phone"))&&(window.history&&"pushState"in window.history)}function supportsPopStateOnHashChange(){return-1===window.navigator.userAgent.indexOf("Trident")}function supportsGoWithoutReloadUsingHash(){return-1===window.navigator.userAgent.indexOf("Firefox")}function isExtraneousPopstateEvent(t){return void 0===t.state&&-1===navigator.userAgent.indexOf("CriOS")}var PopStateEvent="popstate",HashChangeEvent="hashchange";function getHistoryState(){try{return window.history.state||{}}catch(t){return{}}}function createBrowserHistory(t){void 0===t&&(t={}),canUseDOM||invariant(!1);var s=window.history,c=supportsHistory(),n=!supportsPopStateOnHashChange(),e=t,a=e.forceRefresh,h=void 0!==a&&a,r=e.getUserConfirmation,u=void 0===r?getConfirmation:r,o=e.keyLength,i=void 0===o?6:o,f=t.basename?stripTrailingSlash(addLeadingSlash(t.basename)):"";function l(t){var n=t||{},e=n.key,a=n.state,r=window.location,o=r.pathname+r.search+r.hash;return f&&(o=stripBasename(o,f)),createLocation(o,a,e)}function d(){return Math.random().toString(36).substr(2,i)}var v=createTransitionManager();function p(t){_extends(T,t),T.length=s.length,v.notifyListeners(T.location,T.action)}function g(t){isExtraneousPopstateEvent(t)||w(l(t.state))}function P(){w(l(getHistoryState()))}var m=!1;function w(n){if(m)m=!1,p();else{v.confirmTransitionTo(n,"POP",u,(function(t){t?p({action:"POP",location:n}):function(t){var n=T.location,e=H.indexOf(n.key);-1===e&&(e=0);var a=H.indexOf(t.key);-1===a&&(a=0);var r=e-a;r&&(m=!0,L(r))}(n)}))}}var y=l(getHistoryState()),H=[y.key];function x(t){return f+createPath(t)}function L(t){s.go(t)}var O=0;function E(t){1===(O+=t)&&1===t?(window.addEventListener(PopStateEvent,g),n&&window.addEventListener(HashChangeEvent,P)):0===O&&(window.removeEventListener(PopStateEvent,g),n&&window.removeEventListener(HashChangeEvent,P))}var S=!1;var T={length:s.length,action:"POP",location:y,createHref:x,push:function(t,n){var i=createLocation(t,n,d(),T.location);v.confirmTransitionTo(i,"PUSH",u,(function(t){if(t){var n=x(i),e=i.key,a=i.state;if(c)if(s.pushState({key:e,state:a},null,n),h)window.location.href=n;else{var r=H.indexOf(T.location.key),o=H.slice(0,r+1);o.push(i.key),H=o,p({action:"PUSH",location:i})}else window.location.href=n}}))},replace:function(t,n){var o="REPLACE",i=createLocation(t,n,d(),T.location);v.confirmTransitionTo(i,o,u,(function(t){if(t){var n=x(i),e=i.key,a=i.state;if(c)if(s.replaceState({key:e,state:a},null,n),h)window.location.replace(n);else{var r=H.indexOf(T.location.key);-1!==r&&(H[r]=i.key),p({action:o,location:i})}else window.location.replace(n)}}))},go:L,goBack:function(){L(-1)},goForward:function(){L(1)},block:function(t){void 0===t&&(t=!1);var n=v.setPrompt(t);return S||(E(1),S=!0),function(){return S&&(S=!1,E(-1)),n()}},listen:function(t){var n=v.appendListener(t);return E(1),function(){E(-1),n()}}};return T}var HashChangeEvent$1="hashchange",HashPathCoders={hashbang:{encodePath:function(t){return"!"===t.charAt(0)?t:"!/"+stripLeadingSlash(t)},decodePath:function(t){return"!"===t.charAt(0)?t.substr(1):t}},noslash:{encodePath:stripLeadingSlash,decodePath:addLeadingSlash},slash:{encodePath:addLeadingSlash,decodePath:addLeadingSlash}};function stripHash(t){var n=t.indexOf("#");return-1===n?t:t.slice(0,n)}function getHashPath(){var t=window.location.href,n=t.indexOf("#");return-1===n?"":t.substring(n+1)}function pushHashPath(t){window.location.hash=t}function replaceHashPath(t){window.location.replace(stripHash(window.location.href)+"#"+t)}function createHashHistory(t){void 0===t&&(t={}),canUseDOM||invariant(!1);var n=window.history,e=(supportsGoWithoutReloadUsingHash(),t),a=e.getUserConfirmation,i=void 0===a?getConfirmation:a,r=e.hashType,o=void 0===r?"slash":r,s=t.basename?stripTrailingSlash(addLeadingSlash(t.basename)):"",c=HashPathCoders[o],h=c.encodePath,u=c.decodePath;function f(){var t=u(getHashPath());return s&&(t=stripBasename(t,s)),createLocation(t)}var l=createTransitionManager();function d(t){_extends(E,t),E.length=n.length,l.notifyListeners(E.location,E.action)}var v=!1,p=null;function g(){var t=getHashPath(),n=h(t);if(t!==n)replaceHashPath(n);else{var e=f(),a=E.location;if(!v&&function(t,n){return t.pathname===n.pathname&&t.search===n.search&&t.hash===n.hash}(a,e))return;if(p===createPath(e))return;p=null,function(n){if(v)v=!1,d();else{l.confirmTransitionTo(n,"POP",i,(function(t){t?d({action:"POP",location:n}):function(t){var n=E.location,e=y.lastIndexOf(createPath(n));-1===e&&(e=0);var a=y.lastIndexOf(createPath(t));-1===a&&(a=0);var r=e-a;r&&(v=!0,H(r))}(n)}))}}(e)}}var P=getHashPath(),m=h(P);P!==m&&replaceHashPath(m);var w=f(),y=[createPath(w)];function H(t){n.go(t)}var x=0;function L(t){1===(x+=t)&&1===t?window.addEventListener(HashChangeEvent$1,g):0===x&&window.removeEventListener(HashChangeEvent$1,g)}var O=!1;var E={length:n.length,action:"POP",location:w,createHref:function(t){var n=document.querySelector("base"),e="";return n&&n.getAttribute("href")&&(e=stripHash(window.location.href)),e+"#"+h(s+createPath(t))},push:function(t,n){var o=createLocation(t,void 0,void 0,E.location);l.confirmTransitionTo(o,"PUSH",i,(function(t){if(t){var n=createPath(o),e=h(s+n);if(getHashPath()!==e){p=n,pushHashPath(e);var a=y.lastIndexOf(createPath(E.location)),r=y.slice(0,a+1);r.push(n),y=r,d({action:"PUSH",location:o})}else d()}}))},replace:function(t,n){var r="REPLACE",o=createLocation(t,void 0,void 0,E.location);l.confirmTransitionTo(o,r,i,(function(t){if(t){var n=createPath(o),e=h(s+n);getHashPath()!==e&&(p=n,replaceHashPath(e));var a=y.indexOf(createPath(E.location));-1!==a&&(y[a]=n),d({action:r,location:o})}}))},go:H,goBack:function(){H(-1)},goForward:function(){H(1)},block:function(t){void 0===t&&(t=!1);var n=l.setPrompt(t);return O||(L(1),O=!0),function(){return O&&(O=!1,L(-1)),n()}},listen:function(t){var n=l.appendListener(t);return L(1),function(){L(-1),n()}}};return E}function clamp(t,n,e){return Math.min(Math.max(t,n),e)}function createMemoryHistory(t){void 0===t&&(t={});var n=t,r=n.getUserConfirmation,e=n.initialEntries,a=void 0===e?["/"]:e,o=n.initialIndex,i=void 0===o?0:o,s=n.keyLength,c=void 0===s?6:s,h=createTransitionManager();function u(t){_extends(g,t),g.length=g.entries.length,h.notifyListeners(g.location,g.action)}function f(){return Math.random().toString(36).substr(2,c)}var l=clamp(i,0,a.length-1),d=a.map((function(t){return createLocation(t,void 0,"string"==typeof t?f():t.key||f())})),v=createPath;function p(t){var n=clamp(g.index+t,0,g.entries.length-1),e=g.entries[n];h.confirmTransitionTo(e,"POP",r,(function(t){t?u({action:"POP",location:e,index:n}):u()}))}var g={length:d.length,action:"POP",location:d[l],index:l,entries:d,createHref:v,push:function(t,n){var a=createLocation(t,n,f(),g.location);h.confirmTransitionTo(a,"PUSH",r,(function(t){if(t){var n=g.index+1,e=g.entries.slice(0);e.length>n?e.splice(n,e.length-n,a):e.push(a),u({action:"PUSH",location:a,index:n,entries:e})}}))},replace:function(t,n){var e="REPLACE",a=createLocation(t,n,f(),g.location);h.confirmTransitionTo(a,e,r,(function(t){t&&(g.entries[g.index]=a,u({action:e,location:a}))}))},go:p,goBack:function(){p(-1)},goForward:function(){p(1)},canGo:function(t){var n=g.index+t;return 0<=n&&n<g.entries.length},block:function(t){return void 0===t&&(t=!1),h.setPrompt(t)},listen:function(t){return h.appendListener(t)}};return g}exports.createBrowserHistory=createBrowserHistory,exports.createHashHistory=createHashHistory,exports.createMemoryHistory=createMemoryHistory,exports.createLocation=createLocation,exports.locationsAreEqual=locationsAreEqual,exports.parsePath=parsePath,exports.createPath=createPath},function(module,exports,__webpack_require__){"use strict";if(true){module.exports=__webpack_require__(15)}else{}},function(module,exports,__webpack_require__){"use strict";function isAbsolute(e){return"/"===e.charAt(0)}function spliceOne(e,t){for(var s=t,n=s+1,i=e.length;n<i;s+=1,n+=1)e[s]=e[n];e.pop()}function resolvePathname(e,t){void 0===t&&(t="");var s,n=e&&e.split("/")||[],i=t&&t.split("/")||[],l=e&&isAbsolute(e),r=t&&isAbsolute(t),o=l||r;if(e&&isAbsolute(e)?i=n:n.length&&(i.pop(),i=i.concat(n)),!i.length)return"/";if(i.length){var u=i[i.length-1];s="."===u||".."===u||""===u}else s=!1;for(var a=0,c=i.length;0<=c;c--){var f=i[c];"."===f?spliceOne(i,c):".."===f?(spliceOne(i,c),a++):a&&(spliceOne(i,c),a--)}if(!o)for(;a--;a)i.unshift("..");!o||""===i[0]||i[0]&&isAbsolute(i[0])||i.unshift("");var h=i.join("/");return s&&"/"!==h.substr(-1)&&(h+="/"),h}module.exports=resolvePathname},function(module,exports,__webpack_require__){"use strict";if(true){module.exports=__webpack_require__(17)}else{}},function(module,exports,__webpack_require__){"use strict";function valueOf(e){return e.valueOf?e.valueOf():Object.prototype.valueOf.call(e)}function valueEqual(u,r){if(u===r)return!0;if(null==u||null==r)return!1;if(Array.isArray(u))return Array.isArray(r)&&u.length===r.length&&u.every((function(e,u){return valueEqual(e,r[u])}));if("object"!=typeof u&&"object"!=typeof r)return!1;var e=valueOf(u),t=valueOf(r);return e!==u||t!==r?valueEqual(e,t):Object.keys(Object.assign({},u,r)).every((function(e){return valueEqual(u[e],r[e])}))}module.exports=valueEqual},function(module,exports,__webpack_require__){"use strict";var isProduction="production"==="production";function warning(condition,message){if(!isProduction){if(condition){return}var text="Warning: "+message;if(typeof console!=="undefined"){console.warn(text)}try{throw Error(text)}catch(x){}}}module.exports=warning},function(module,exports,__webpack_require__){"use strict";var isProduction="production"==="production";var prefix="Invariant failed";function invariant(condition,message){if(condition){return}if(isProduction){throw new Error(prefix)}var provided=typeof message==="function"?message():message;var value=provided?prefix+": "+provided:prefix;throw new Error(value)}module.exports=invariant},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"EditorRenderProps",(function(){return undefined}));__webpack_require__.d(__webpack_exports__,"VisualizeConstants",(function(){return visualize_constants["b"]}));__webpack_require__.d(__webpack_exports__,"plugin",(function(){return public_plugin}));var external_osdSharedDeps_Rxjs_=__webpack_require__(7);var external_osdSharedDeps_OsdI18n_=__webpack_require__(4);var external_osdSharedDeps_RxjsOperators_=__webpack_require__(6);var node_modules_history=__webpack_require__(10);var public_=__webpack_require__(1);var data_public_=__webpack_require__(3);var visualize_constants=__webpack_require__(5);var home_public_=__webpack_require__(8);var core_public_=__webpack_require__(9);var uiActions_public_=__webpack_require__(2);var public_services=__webpack_require__(0);const STATE_STORAGE_KEY="_a";const GLOBAL_STATE_STORAGE_KEY="_g";const VISUALIZE_APP_URL_GENERATOR="VISUALIZE_APP_URL_GENERATOR";const createVisualizeUrlGenerator=getStartServices=>({id:VISUALIZE_APP_URL_GENERATOR,createUrl:async _ref=>{let{visualizationId:visualizationId,filters:filters,indexPatternId:indexPatternId,query:query,refreshInterval:refreshInterval,vis:vis,type:type,timeRange:timeRange,hash:hash}=_ref;const startServices=await getStartServices();const useHash=hash!==null&&hash!==void 0?hash:startServices.useHashedUrl;const appBasePath=startServices.appBasePath;const mode=visualizationId?"edit/".concat(visualizationId):"create";const appState={};const queryState={};if(query)appState.query=query;if(filters&&filters.length)appState.filters=filters===null||filters===void 0?void 0:filters.filter(f=>!data_public_["opensearchFilters"].isFilterPinned(f));if(vis)appState.vis=vis;if(timeRange)queryState.time=timeRange;if(filters&&filters.length)queryState.filters=filters===null||filters===void 0?void 0:filters.filter(f=>data_public_["opensearchFilters"].isFilterPinned(f));if(refreshInterval)queryState.refreshInterval=refreshInterval;let url="".concat(appBasePath,"#/").concat(mode);url=Object(public_["setStateToOsdUrl"])(GLOBAL_STATE_STORAGE_KEY,queryState,{useHash:useHash},url);url=Object(public_["setStateToOsdUrl"])(STATE_STORAGE_KEY,appState,{useHash:useHash},url);if(indexPatternId){url="".concat(url,"&indexPattern=").concat(indexPatternId)}if(type){url="".concat(url,"&type=").concat(type)}return url}});const AGGS_TERMS_SIZE_SETTING="discover:aggs:terms:size";const visualizeFieldAction=Object(uiActions_public_["createAction"])({type:uiActions_public_["ACTION_VISUALIZE_FIELD"],id:uiActions_public_["ACTION_VISUALIZE_FIELD"],getDisplayName:()=>external_osdSharedDeps_OsdI18n_["i18n"].translate("visualize.discover.visualizeFieldLabel",{defaultMessage:"Visualize field"}),isCompatible:async()=>!!Object(public_services["a"])().capabilities.visualize.show,getHref:async context=>{const url=await getVisualizeUrl(context);return url},execute:async context=>{const url=await getVisualizeUrl(context);const hash=url.split("#")[1];Object(public_services["a"])().navigateToApp("visualize",{path:"/#".concat(hash)})}});const getVisualizeUrl=async context=>{const indexPattern=await Object(public_services["b"])().get(context.indexPatternId);const field=indexPattern.fields.find(fld=>fld.name===context.fieldName);const aggsTermSize=Object(public_services["e"])().get(AGGS_TERMS_SIZE_SETTING);let agg;if((field===null||field===void 0?void 0:field.type)==="date"&&indexPattern.timeFieldName===context.fieldName){agg={type:"date_histogram",schema:"segment",params:{field:context.fieldName,interval:"auto"}}}else{agg={type:"terms",schema:"segment",params:{field:context.fieldName,size:parseInt(aggsTermSize,10),orderBy:"1"}}}const generator=Object(public_services["d"])().urlGenerators.getUrlGenerator(VISUALIZE_APP_URL_GENERATOR);const urlState={filters:Object(public_services["c"])().filterManager.getFilters(),query:Object(public_services["c"])().queryString.getQuery(),timeRange:Object(public_services["c"])().timefilter.timefilter.getTime(),indexPatternId:context.indexPatternId,type:"histogram",vis:{type:"histogram",aggs:[{schema:"metric",type:"count",id:"1"},agg]}};return generator.createUrl(urlState)};function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}class plugin_VisualizePlugin{constructor(initializerContext){this.initializerContext=initializerContext;_defineProperty(this,"appStateUpdater",new external_osdSharedDeps_Rxjs_["BehaviorSubject"](()=>({})));_defineProperty(this,"stopUrlTracking",undefined);_defineProperty(this,"currentHistory",undefined)}async setup(core,_ref){let{home:home,urlForwarding:urlForwarding,data:data,share:share,uiActions:uiActions}=_ref;const{appMounted:appMounted,appUnMounted:appUnMounted,stop:stopUrlTracker,setActiveUrl:setActiveUrl,restorePreviousUrl:restorePreviousUrl}=Object(public_["createOsdUrlTracker"])({baseUrl:core.http.basePath.prepend("/app/visualize"),defaultSubUrl:"#/",storageKey:"lastUrl:".concat(core.http.basePath.get(),":visualize"),navLinkUpdater$:this.appStateUpdater,toastNotifications:core.notifications.toasts,stateParams:[{osdUrlKey:"_g",stateUpdate$:data.query.state$.pipe(Object(external_osdSharedDeps_RxjsOperators_["filter"])(_ref2=>{let{changes:changes}=_ref2;return!!(changes.globalFilters||changes.time||changes.refreshInterval)}),Object(external_osdSharedDeps_RxjsOperators_["map"])(_ref3=>{var _state$filters;let{state:state}=_ref3;return{...state,filters:(_state$filters=state.filters)===null||_state$filters===void 0?void 0:_state$filters.filter(data_public_["opensearchFilters"].isFilterPinned)}}))}],getHistory:()=>this.currentHistory});this.stopUrlTracking=()=>{stopUrlTracker()};if(share){share.urlGenerators.registerUrlGenerator(createVisualizeUrlGenerator(async()=>{const[coreStart]=await core.getStartServices();return{appBasePath:coreStart.application.getUrlForApp("visualize"),useHashedUrl:coreStart.uiSettings.get("state:storeInSessionStorage")}}))}Object(public_services["k"])(core.uiSettings);uiActions.addTriggerAction(uiActions_public_["VISUALIZE_FIELD_TRIGGER"],visualizeFieldAction);core.application.register({id:"visualize",title:"Visualize",order:8e3,euiIconType:"inputOutput",defaultPath:"#/",category:core_public_["DEFAULT_APP_CATEGORIES"].opensearchDashboards,updater$:this.appStateUpdater.asObservable(),mount:async params=>{const[coreStart,pluginsStart]=await core.getStartServices();this.currentHistory=params.history;pluginsStart.data.indexPatterns.clearCache();await pluginsStart.data.indexPatterns.ensureDefaultIndexPattern();appMounted();const unlistenParentHistory=params.history.listen(()=>{window.dispatchEvent(new HashChangeEvent("hashchange"))});const history=Object(node_modules_history["createHashHistory"])();const services={...coreStart,history:history,osdUrlStateStorage:Object(public_["createOsdUrlStateStorage"])({history:history,useHash:coreStart.uiSettings.get("state:storeInSessionStorage"),...Object(public_["withNotifyOnErrors"])(coreStart.notifications.toasts)}),urlForwarding:pluginsStart.urlForwarding,pluginInitializerContext:this.initializerContext,chrome:coreStart.chrome,data:pluginsStart.data,localStorage:new public_["Storage"](localStorage),navigation:pluginsStart.navigation,savedVisualizations:pluginsStart.visualizations.savedVisualizationsLoader,share:pluginsStart.share,toastNotifications:coreStart.notifications.toasts,visualizeCapabilities:coreStart.application.capabilities.visualize,visualizations:pluginsStart.visualizations,embeddable:pluginsStart.embeddable,setActiveUrl:setActiveUrl,createVisEmbeddableFromObject:pluginsStart.visualizations.__LEGACY.createVisEmbeddableFromObject,savedObjectsPublic:pluginsStart.savedObjects,scopedHistory:params.history,restorePreviousUrl:restorePreviousUrl,dashboard:pluginsStart.dashboard,setHeaderActionMenu:params.setHeaderActionMenu};params.element.classList.add("visAppWrapper");const{renderApp:renderApp}=await Promise.all([__webpack_require__.e(1),__webpack_require__.e(2)]).then(__webpack_require__.bind(null,200));const unmount=renderApp(params,services);return()=>{params.element.classList.remove("visAppWrapper");unlistenParentHistory();unmount();appUnMounted()}}});urlForwarding.forwardApp("visualize","visualize");if(home){home.featureCatalogue.register({id:"visualize",title:"Visualize",description:external_osdSharedDeps_OsdI18n_["i18n"].translate("visualize.visualizeDescription",{defaultMessage:"Create visualizations and aggregate data stores in your OpenSearch indices."}),icon:"visualizeApp",path:"/app/visualize#".concat(visualize_constants["b"].LANDING_PAGE_PATH),showOnHomePage:false,category:home_public_["FeatureCatalogueCategory"].DATA})}}start(core,plugins){Object(public_services["g"])(core.application);Object(public_services["h"])(plugins.data.indexPatterns);Object(public_services["i"])(plugins.data.query);if(plugins.share){Object(public_services["j"])(plugins.share)}Object(public_services["l"])(plugins.uiActions)}stop(){if(this.stopUrlTracking){this.stopUrlTracking()}}}const public_plugin=context=>new plugin_VisualizePlugin(context)},function(module,exports){module.exports=__osdSharedDeps__.React},function(module,exports){module.exports=__osdSharedDeps__.TsLib},function(module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var ns=__osdBundles__.get("plugin/opensearchDashboardsReact/public");Object.defineProperties(__webpack_exports__,Object.getOwnPropertyDescriptors(ns))},function(module,exports){module.exports=__osdSharedDeps__.Lodash},function(module,exports){module.exports=__osdSharedDeps__.ReactRouterDom},function(module,exports){module.exports=__osdSharedDeps__.ElasticEui},function(module,exports){module.exports=__osdSharedDeps__.OsdI18nReact},function(module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var ns=__osdBundles__.get("plugin/visualizations/public");Object.defineProperties(__webpack_exports__,Object.getOwnPropertyDescriptors(ns))},function(module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var ns=__osdBundles__.get("plugin/visDefaultEditor/public");Object.defineProperties(__webpack_exports__,Object.getOwnPropertyDescriptors(ns))},function(module,exports){module.exports=__osdSharedDeps__.ReactDom},function(module,exports){module.exports=__osdSharedDeps__.Moment},function(module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var ns=__osdBundles__.get("plugin/savedObjects/public");Object.defineProperties(__webpack_exports__,Object.getOwnPropertyDescriptors(ns))},function(module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var ns=__osdBundles__.get("plugin/discover/public");Object.defineProperties(__webpack_exports__,Object.getOwnPropertyDescriptors(ns))},function(module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var ns=__osdBundles__.get("plugin/savedObjectsManagement/public");Object.defineProperties(__webpack_exports__,Object.getOwnPropertyDescriptors(ns))}]);