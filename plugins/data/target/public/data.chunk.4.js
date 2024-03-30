(window["data_bundle_jsonpfunction"]=window["data_bundle_jsonpfunction"]||[]).push([[4,10],{160:function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/(function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){var classes=[];for(var i=0;i<arguments.length;i++){var arg=arguments[i];if(!arg)continue;var argType=typeof arg;if(argType==="string"||argType==="number"){classes.push(arg)}else if(Array.isArray(arg)){if(arg.length){var inner=classNames.apply(null,arg);if(inner){classes.push(inner)}}}else if(argType==="object"){if(arg.toString===Object.prototype.toString){for(var key in arg){if(hasOwn.call(arg,key)&&arg[key]){classes.push(key)}}}else{classes.push(arg.toString())}}}return classes.join(" ")}if(true&&module.exports){classNames.default=classNames;module.exports=classNames}else if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__))}else{}})()},163:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"default",(function(){return QueryBarTopRow}));var target=__webpack_require__(15);var target_default=__webpack_require__.n(target);var classnames=__webpack_require__(160);var classnames_default=__webpack_require__.n(classnames);var external_osdSharedDeps_React_=__webpack_require__(3);var external_osdSharedDeps_React_default=__webpack_require__.n(external_osdSharedDeps_React_);var external_osdSharedDeps_OsdI18n_=__webpack_require__(0);var external_osdSharedDeps_ElasticEui_=__webpack_require__(21);var external_osdSharedDeps_OsdI18nReact_=__webpack_require__(41);var public_=__webpack_require__(20);var query_string_input=__webpack_require__(162);var common=__webpack_require__(1);var public_query=__webpack_require__(11);const NO_DATA_POPOVER_STORAGE_KEY="data.noDataPopover";function NoDataPopover(_ref){let{showNoDataPopover:showNoDataPopover,storage:storage,children:children}=_ref;const[noDataPopoverDismissed,setNoDataPopoverDismissed]=Object(external_osdSharedDeps_React_["useState"])(()=>Boolean(storage.get(NO_DATA_POPOVER_STORAGE_KEY)));const[noDataPopoverVisible,setNoDataPopoverVisible]=Object(external_osdSharedDeps_React_["useState"])(false);Object(external_osdSharedDeps_React_["useEffect"])(()=>{if(showNoDataPopover&&!noDataPopoverDismissed){setNoDataPopoverVisible(true)}},[noDataPopoverDismissed,showNoDataPopover]);return external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_ElasticEui_["EuiTourStep"],{onFinish:()=>{},closePopover:()=>{setNoDataPopoverVisible(false)},content:external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_ElasticEui_["EuiText"],{size:"s"},external_osdSharedDeps_React_default.a.createElement("p",{style:{maxWidth:300}},external_osdSharedDeps_OsdI18n_["i18n"].translate("data.noDataPopover.content",{defaultMessage:"This time range doesn't contain any data. Increase or adjust the time range to see more fields and create charts."}))),minWidth:300,anchorPosition:"downCenter",anchorClassName:"eui-displayBlock",step:1,stepsTotal:1,isStepOpen:noDataPopoverVisible,subtitle:external_osdSharedDeps_OsdI18n_["i18n"].translate("data.noDataPopover.subtitle",{defaultMessage:"Tip"}),title:external_osdSharedDeps_OsdI18n_["i18n"].translate("data.noDataPopover.title",{defaultMessage:"Empty dataset"}),footerAction:external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_ElasticEui_["EuiButtonEmpty"],{size:"xs",flush:"right",color:"text","data-test-subj":"noDataPopoverDismissButton",onClick:()=>{storage.set(NO_DATA_POPOVER_STORAGE_KEY,true);setNoDataPopoverDismissed(true);setNoDataPopoverVisible(false)}},external_osdSharedDeps_OsdI18n_["i18n"].translate("data.noDataPopover.dismissAction",{defaultMessage:"Don't show again"}))},external_osdSharedDeps_React_default.a.createElement("div",{onFocus:()=>{setNoDataPopoverVisible(false)}},children))}const QueryStringInput=Object(public_["withOpenSearchDashboards"])(query_string_input["default"]);function QueryBarTopRow(props){const[isDateRangeInvalid,setIsDateRangeInvalid]=Object(external_osdSharedDeps_React_["useState"])(false);const[isQueryInputFocused,setIsQueryInputFocused]=Object(external_osdSharedDeps_React_["useState"])(false);const opensearchDashboards=Object(public_["useOpenSearchDashboards"])();const{uiSettings:uiSettings,notifications:notifications,storage:storage,appName:appName,docLinks:docLinks}=opensearchDashboards.services;const osdDQLDocs=docLinks.links.opensearchDashboards.dql.base;const queryLanguage=props.query&&props.query.language;const persistedLog=external_osdSharedDeps_React_default.a.useMemo(()=>queryLanguage&&uiSettings&&storage&&appName?Object(public_query["w"])(uiSettings,storage,appName,queryLanguage):undefined,[appName,queryLanguage,uiSettings,storage]);function onClickSubmitButton(event){if(persistedLog&&props.query){persistedLog.add(props.query.query)}event.preventDefault();onSubmit({query:props.query,dateRange:getDateRange()})}function getDateRange(){const defaultTimeSetting=uiSettings.get(common["UI_SETTINGS"].TIMEPICKER_TIME_DEFAULTS);return{from:props.dateRangeFrom||defaultTimeSetting.from,to:props.dateRangeTo||defaultTimeSetting.to}}function onQueryChange(query){props.onChange({query:query,dateRange:getDateRange()})}function onChangeQueryInputFocus(isFocused){setIsQueryInputFocused(isFocused)}function onTimeChange(_ref){let{start:start,end:end,isInvalid:isInvalid,isQuickSelection:isQuickSelection}=_ref;setIsDateRangeInvalid(isInvalid);const retVal={query:props.query,dateRange:{from:start,to:end}};if(isQuickSelection){props.onSubmit(retVal)}else{props.onChange(retVal)}}function onRefresh(_ref2){let{start:start,end:end}=_ref2;const retVal={dateRange:{from:start,to:end}};if(props.onRefresh){props.onRefresh(retVal)}}function onSubmit(_ref3){let{query:query,dateRange:dateRange}=_ref3;handleLuceneSyntaxWarning();if(props.timeHistory){props.timeHistory.add(dateRange)}props.onSubmit({query:query,dateRange:dateRange})}function onInputSubmit(query){onSubmit({query:query,dateRange:getDateRange()})}function toAbsoluteString(value){let roundUp=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;const valueAsMoment=target_default.a.parse(value,{roundUp:roundUp});if(!valueAsMoment){return value}return valueAsMoment.toISOString()}function renderQueryInput(){if(!shouldRenderQueryInput())return;return external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_ElasticEui_["EuiFlexItem"],null,external_osdSharedDeps_React_default.a.createElement(QueryStringInput,{disableAutoFocus:props.disableAutoFocus,indexPatterns:props.indexPatterns,prepend:props.prepend,query:props.query,screenTitle:props.screenTitle,onChange:onQueryChange,onChangeQueryInputFocus:onChangeQueryInputFocus,onSubmit:onInputSubmit,persistedLog:persistedLog,dataTestSubj:props.dataTestSubj}))}function renderSharingMetaFields(){const{from:from,to:to}=getDateRange();const dateRangePretty=Object(external_osdSharedDeps_ElasticEui_["prettyDuration"])(toAbsoluteString(from),toAbsoluteString(to),[],uiSettings.get("dateFormat"));return external_osdSharedDeps_React_default.a.createElement("div",{"data-shared-timefilter-duration":dateRangePretty,"data-test-subj":"dataSharedTimefilterDuration"})}function shouldRenderDatePicker(){return Boolean(props.showDatePicker||props.showAutoRefreshOnly)}function shouldRenderQueryInput(){return Boolean(props.showQueryInput&&props.indexPatterns&&props.query&&storage)}function renderUpdateButton(){const button=props.customSubmitButton?external_osdSharedDeps_React_default.a.cloneElement(props.customSubmitButton,{onClick:onClickSubmitButton}):external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_ElasticEui_["EuiSuperUpdateButton"],{needsUpdate:props.isDirty,isDisabled:isDateRangeInvalid,isLoading:props.isLoading,onClick:onClickSubmitButton,"data-test-subj":"querySubmitButton"});if(!shouldRenderDatePicker()){return button}return external_osdSharedDeps_React_default.a.createElement(NoDataPopover,{storage:storage,showNoDataPopover:props.indicateNoData},external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_ElasticEui_["EuiFlexGroup"],{responsive:false,gutterSize:"s"},renderDatePicker(),external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_ElasticEui_["EuiFlexItem"],{grow:false},button)))}function renderDatePicker(){if(!shouldRenderDatePicker()){return null}let recentlyUsedRanges;if(props.timeHistory){recentlyUsedRanges=props.timeHistory.get().map(_ref4=>{let{from:from,to:to}=_ref4;return{start:from,end:to}})}const commonlyUsedRanges=uiSettings.get(common["UI_SETTINGS"].TIMEPICKER_QUICK_RANGES).map(_ref5=>{let{from:from,to:to,display:display}=_ref5;return{start:from,end:to,label:display}});const wrapperClasses=classnames_default()("osdQueryBar__datePickerWrapper",{"osdQueryBar__datePickerWrapper-isHidden":isQueryInputFocused});return external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_ElasticEui_["EuiFlexItem"],{className:wrapperClasses},external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_ElasticEui_["EuiSuperDatePicker"],{start:props.dateRangeFrom,end:props.dateRangeTo,isPaused:props.isRefreshPaused,refreshInterval:props.refreshInterval,onTimeChange:onTimeChange,onRefresh:onRefresh,onRefreshChange:props.onRefreshChange,showUpdateButton:false,recentlyUsedRanges:recentlyUsedRanges,commonlyUsedRanges:commonlyUsedRanges,dateFormat:uiSettings.get("dateFormat"),isAutoRefreshOnly:props.showAutoRefreshOnly,className:"osdQueryBar__datePicker"}))}function handleLuceneSyntaxWarning(){if(!props.query)return;const{query:query,language:language}=props.query;if(language==="kuery"&&typeof query==="string"&&(!storage||!storage.get("opensearchDashboards.luceneSyntaxWarningOptOut"))&&Object(common["doesKueryExpressionHaveLuceneSyntaxError"])(query)){const toast=notifications.toasts.addWarning({title:external_osdSharedDeps_OsdI18n_["i18n"].translate("data.query.queryBar.luceneSyntaxWarningTitle",{defaultMessage:"Lucene syntax warning"}),text:Object(public_["toMountPoint"])(external_osdSharedDeps_React_default.a.createElement("div",null,external_osdSharedDeps_React_default.a.createElement("p",null,external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_OsdI18nReact_["FormattedMessage"],{id:"data.query.queryBar.luceneSyntaxWarningMessage",defaultMessage:"It looks like you may be trying to use Lucene query syntax, although you have opensearchDashboards Query Language (DQL) selected. Please review the DQL docs {link}.",values:{link:external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_ElasticEui_["EuiLink"],{href:osdDQLDocs,target:"_blank"},external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_OsdI18nReact_["FormattedMessage"],{id:"data.query.queryBar.syntaxOptionsDescription.docsLinkText",defaultMessage:"here"}))}})),external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_ElasticEui_["EuiFlexGroup"],{justifyContent:"flexEnd",gutterSize:"s"},external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_ElasticEui_["EuiFlexItem"],{grow:false},external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_ElasticEui_["EuiButton"],{size:"s",onClick:()=>onLuceneSyntaxWarningOptOut(toast)},external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_OsdI18nReact_["FormattedMessage"],{id:"data.query.queryBar.luceneSyntaxWarningOptOutText",defaultMessage:"Don't show again"}))))))})}}function onLuceneSyntaxWarningOptOut(toast){if(!storage)return;storage.set("opensearchDashboards.luceneSyntaxWarningOptOut",true);notifications.toasts.remove(toast)}const classes=classnames_default()("osdQueryBar",{"osdQueryBar--withDatePicker":props.showDatePicker});return external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_ElasticEui_["EuiFlexGroup"],{className:classes,responsive:!!props.showDatePicker,gutterSize:"s",justifyContent:"flexEnd"},renderQueryInput(),renderSharingMetaFields(),external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_ElasticEui_["EuiFlexItem"],{grow:false},renderUpdateButton()))}QueryBarTopRow.defaultProps={showQueryInput:true,showDatePicker:true,showAutoRefreshOnly:false}}}]);