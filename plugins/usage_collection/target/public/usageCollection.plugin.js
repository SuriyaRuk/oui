(function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId]){return installedModules[moduleId].exports}var module=installedModules[moduleId]={i:moduleId,l:false,exports:{}};modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);module.l=true;return module.exports}__webpack_require__.m=modules;__webpack_require__.c=installedModules;__webpack_require__.d=function(exports,name,getter){if(!__webpack_require__.o(exports,name)){Object.defineProperty(exports,name,{enumerable:true,get:getter})}};__webpack_require__.r=function(exports){if(typeof Symbol!=="undefined"&&Symbol.toStringTag){Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"})}Object.defineProperty(exports,"__esModule",{value:true})};__webpack_require__.t=function(value,mode){if(mode&1)value=__webpack_require__(value);if(mode&8)return value;if(mode&4&&typeof value==="object"&&value&&value.__esModule)return value;var ns=Object.create(null);__webpack_require__.r(ns);Object.defineProperty(ns,"default",{enumerable:true,value:value});if(mode&2&&typeof value!="string")for(var key in value)__webpack_require__.d(ns,key,function(key){return value[key]}.bind(null,key));return ns};__webpack_require__.n=function(module){var getter=module&&module.__esModule?function getDefault(){return module["default"]}:function getModuleExports(){return module};__webpack_require__.d(getter,"a",getter);return getter};__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)};__webpack_require__.p="";return __webpack_require__(__webpack_require__.s=4)})([function(module,exports){module.exports=__osdSharedDeps__.MomentTimezone},function(module,exports){module.exports=__osdSharedDeps__.Rxjs},function(module,exports){module.exports=__osdSharedDeps__.RxjsOperators},function(module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__);var ns=__osdBundles__.get("plugin/opensearchDashboardsUtils/public");Object.defineProperties(__webpack_exports__,Object.getOwnPropertyDescriptors(ns))},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _node_modules_val_loader_dist_cjs_js_key_usageCollection_osd_ui_shared_deps_public_path_module_creator_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(5);var _node_modules_val_loader_dist_cjs_js_key_usageCollection_osd_ui_shared_deps_public_path_module_creator_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_val_loader_dist_cjs_js_key_usageCollection_osd_ui_shared_deps_public_path_module_creator_js__WEBPACK_IMPORTED_MODULE_0__);__osdBundles__.define("plugin/usageCollection/public",__webpack_require__,6)},function(module,exports,__webpack_require__){__webpack_require__.p=window.__osdPublicPath__["usageCollection"]},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"METRIC_TYPE",(function(){return METRIC_TYPE}));__webpack_require__.d(__webpack_exports__,"UsageCollectionSetup",(function(){return undefined}));__webpack_require__.d(__webpack_exports__,"UsageCollectionStart",(function(){return undefined}));__webpack_require__.d(__webpack_exports__,"plugin",(function(){return public_plugin}));function wrapArray(subj){return Array.isArray(subj)?subj:[subj]}class UnreachableCaseError extends Error{constructor(val){super("Unreachable case: ".concat(val))}}function createUiStatsMetric(_ref){let{type:type,appName:appName,eventName:eventName,count:count=1}=_ref;return{type:type,appName:appName,eventName:eventName,count:count}}function trackUsageAgent(appName){const userAgent=window&&window.navigator&&window.navigator.userAgent||"";return{type:METRIC_TYPE.USER_AGENT,appName:appName,userAgent:userAgent}}var external_osdSharedDeps_MomentTimezone_=__webpack_require__(0);var external_osdSharedDeps_MomentTimezone_default=__webpack_require__.n(external_osdSharedDeps_MomentTimezone_);function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}class application_usage_ApplicationUsage{constructor(){_defineProperty(this,"currentUsage",void 0)}start(){if(window)window.addEventListener("click",()=>this.currentUsage&&this.currentUsage.numberOfClicks++)}appChanged(appId){const currentUsage=this.currentUsage;if(appId){this.currentUsage={type:METRIC_TYPE.APPLICATION_USAGE,appId:appId,startTime:external_osdSharedDeps_MomentTimezone_default()(),numberOfClicks:0}}else{this.currentUsage=void 0}return currentUsage}}let METRIC_TYPE;(function(METRIC_TYPE){METRIC_TYPE["COUNT"]="count";METRIC_TYPE["LOADED"]="loaded";METRIC_TYPE["CLICK"]="click";METRIC_TYPE["USER_AGENT"]="user_agent";METRIC_TYPE["APPLICATION_USAGE"]="application_usage"})(METRIC_TYPE||(METRIC_TYPE={}));function storage_defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}class ReportStorageManager{constructor(storageKey,storage){storage_defineProperty(this,"storageKey",void 0);storage_defineProperty(this,"storage",void 0);this.storageKey=storageKey;this.storage=storage}get(){if(!this.storage)return;return this.storage.get(this.storageKey)}store(report){if(!this.storage)return;this.storage.set(this.storageKey,report)}}function report_defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}const REPORT_VERSION=1;class report_ReportManager{constructor(report){report_defineProperty(this,"report",void 0);this.report=report||report_ReportManager.createReport()}static createReport(){return{reportVersion:REPORT_VERSION}}clearReport(){this.report=report_ReportManager.createReport()}isReportEmpty(){const{uiStatsMetrics:uiStatsMetrics,userAgent:userAgent,application_usage:appUsage}=this.report;const noUiStats=!uiStatsMetrics||Object.keys(uiStatsMetrics).length===0;const noUserAgent=!userAgent||Object.keys(userAgent).length===0;const noAppUsage=!appUsage||Object.keys(appUsage).length===0;return noUiStats&&noUserAgent&&noAppUsage}incrementStats(count,stats){const{min:min=0,max:max=0,sum:sum=0}=stats||{};const newMin=Math.min(min,count);const newMax=Math.max(max,count);const newAvg=newMin+newMax/2;const newSum=sum+count;return{min:newMin,max:newMax,avg:newAvg,sum:newSum}}assignReports(newMetrics){wrapArray(newMetrics).forEach(newMetric=>this.assignReport(this.report,newMetric));return{report:this.report}}static createMetricKey(metric){switch(metric.type){case METRIC_TYPE.USER_AGENT:{const{appName:appName,type:type}=metric;return"".concat(appName,"-").concat(type)}case METRIC_TYPE.CLICK:case METRIC_TYPE.LOADED:case METRIC_TYPE.COUNT:{const{appName:appName,eventName:eventName,type:type}=metric;return"".concat(appName,"-").concat(type,"-").concat(eventName)}case METRIC_TYPE.APPLICATION_USAGE:return metric.appId;default:throw new UnreachableCaseError(metric)}}assignReport(report,metric){const key=report_ReportManager.createMetricKey(metric);switch(metric.type){case METRIC_TYPE.USER_AGENT:{const{appName:appName,type:type,userAgent:userAgent}=metric;if(userAgent){report.userAgent={[key]:{key:key,appName:appName,type:type,userAgent:metric.userAgent}}}return}case METRIC_TYPE.CLICK:case METRIC_TYPE.LOADED:case METRIC_TYPE.COUNT:{const{appName:appName,type:type,eventName:eventName,count:count}=metric;report.uiStatsMetrics=report.uiStatsMetrics||{};const existingStats=(report.uiStatsMetrics[key]||{}).stats;report.uiStatsMetrics[key]={key:key,appName:appName,eventName:eventName,type:type,stats:this.incrementStats(count,existingStats)};return}case METRIC_TYPE.APPLICATION_USAGE:const{numberOfClicks:numberOfClicks,startTime:startTime}=metric;const minutesOnScreen=external_osdSharedDeps_MomentTimezone_default()().diff(startTime,"minutes",true);report.application_usage=report.application_usage||{};const appExistingData=report.application_usage[key]||{minutesOnScreen:0,numberOfClicks:0};report.application_usage[key]={minutesOnScreen:appExistingData.minutesOnScreen+minutesOnScreen,numberOfClicks:appExistingData.numberOfClicks+numberOfClicks};break;default:throw new UnreachableCaseError(metric)}}}report_defineProperty(report_ReportManager,"REPORT_VERSION",REPORT_VERSION);function reporter_defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}class reporter_Reporter{constructor(config){reporter_defineProperty(this,"checkInterval",void 0);reporter_defineProperty(this,"interval",void 0);reporter_defineProperty(this,"lastAppId",void 0);reporter_defineProperty(this,"reportManager",void 0);reporter_defineProperty(this,"storageManager",void 0);reporter_defineProperty(this,"applicationUsage",void 0);reporter_defineProperty(this,"debug",void 0);reporter_defineProperty(this,"retryCount",0);reporter_defineProperty(this,"maxRetries",3);reporter_defineProperty(this,"started",false);reporter_defineProperty(this,"start",()=>{if(!this.interval){this.interval=setTimeout(()=>{this.interval=undefined;this.sendReports()},this.checkInterval)}if(this.started){return}if(window&&document){window.addEventListener("beforeunload",()=>this.reportApplicationUsage());document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"&&this.lastAppId){this.reportApplicationUsage(this.lastAppId)}else if(document.visibilityState==="hidden"){this.reportApplicationUsage();this.sendReports()}})}this.started=true;this.applicationUsage.start()});reporter_defineProperty(this,"reportUiStats",(appName,type,eventNames,count)=>{const metrics=wrapArray(eventNames).map(eventName=>{this.log("".concat(type," Metric -> (").concat(appName,":").concat(eventName,"):"));const report=createUiStatsMetric({type:type,appName:appName,eventName:eventName,count:count});this.log(report);return report});this.saveToReport(metrics)});reporter_defineProperty(this,"reportUserAgent",appName=>{this.log("Reporting user-agent.");const report=trackUsageAgent(appName);this.saveToReport([report])});reporter_defineProperty(this,"sendReports",async()=>{if(!this.reportManager.isReportEmpty()){try{this.flushReport()}catch(err){this.log("Error Sending Metrics Report ".concat(err));this.retryCount=this.retryCount+1;const versionMismatch=this.reportManager.report.reportVersion!==report_ReportManager.REPORT_VERSION;if(versionMismatch||this.retryCount>this.maxRetries){this.flushReport()}}}this.start()});const{storage:storage,debug:debug,checkInterval:checkInterval=9e4,storageKey:storageKey="analytics"}=config;this.checkInterval=checkInterval;this.applicationUsage=new application_usage_ApplicationUsage;this.storageManager=new ReportStorageManager(storageKey,storage);const storedReport=this.storageManager.get();this.reportManager=new report_ReportManager(storedReport);this.debug=!!debug}saveToReport(newMetrics){this.reportManager.assignReports(newMetrics);this.storageManager.store(this.reportManager.report)}flushReport(){this.retryCount=0;this.reportManager.clearReport();this.storageManager.store(this.reportManager.report)}log(message){if(this.debug){console.debug(message)}}reportApplicationUsage(appId){this.log("Reporting application changed to ".concat(appId));this.lastAppId=appId||this.lastAppId}}var external_osdSharedDeps_Rxjs_=__webpack_require__(1);var public_=__webpack_require__(3);function createReporter(config){const{localStorage:localStorage,debug:debug}=config;return new reporter_Reporter({debug:debug,storage:localStorage})}var external_osdSharedDeps_RxjsOperators_=__webpack_require__(2);const DO_NOT_REPORT=["opensearchDashboards"];function reportApplicationUsage(currentAppId$,reporter){currentAppId$.pipe(Object(external_osdSharedDeps_RxjsOperators_["filter"])(appId=>typeof appId==="string"&&!DO_NOT_REPORT.includes(appId)),Object(external_osdSharedDeps_RxjsOperators_["distinctUntilChanged"])()).subscribe(appId=>appId&&reporter.reportApplicationUsage(appId))}function plugin_defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}function isUnauthenticated(http){const{anonymousPaths:anonymousPaths}=http;return anonymousPaths.isAnonymous(window.location.pathname)}class plugin_UsageCollectionPlugin{constructor(initializerContext){plugin_defineProperty(this,"legacyAppId$",new external_osdSharedDeps_Rxjs_["Subject"]);plugin_defineProperty(this,"trackUserAgent",true);plugin_defineProperty(this,"reporter",void 0);plugin_defineProperty(this,"config",void 0);this.config=initializerContext.config.get()}setup(_ref){let{http:http}=_ref;const localStorage=new public_["Storage"](window.localStorage);const debug=this.config.uiMetric.debug;this.reporter=createReporter({localStorage:localStorage,debug:debug,fetch:http});return{allowTrackUserAgent:allow=>{this.trackUserAgent=allow},reportUiStats:this.reporter.reportUiStats,METRIC_TYPE:METRIC_TYPE,__LEGACY:{appChanged:appId=>this.legacyAppId$.next(appId)}}}start(_ref2){let{http:http,application:application}=_ref2;if(!this.reporter){throw new Error("Usage collection reporter not set up correctly")}if(this.config.uiMetric.enabled&&!isUnauthenticated(http)){this.reporter.start()}if(this.trackUserAgent){this.reporter.reportUserAgent("opensearchDashboards")}reportApplicationUsage(Object(external_osdSharedDeps_Rxjs_["merge"])(application.currentAppId$,this.legacyAppId$),this.reporter);return{reportUiStats:this.reporter.reportUiStats,METRIC_TYPE:METRIC_TYPE}}stop(){}}function public_plugin(initializerContext){return new plugin_UsageCollectionPlugin(initializerContext)}}]);