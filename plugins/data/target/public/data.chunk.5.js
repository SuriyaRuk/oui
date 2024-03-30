(window["data_bundle_jsonpfunction"]=window["data_bundle_jsonpfunction"]||[]).push([[5,10],{160:function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/(function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){var classes=[];for(var i=0;i<arguments.length;i++){var arg=arguments[i];if(!arg)continue;var argType=typeof arg;if(argType==="string"||argType==="number"){classes.push(arg)}else if(Array.isArray(arg)){if(arg.length){var inner=classNames.apply(null,arg);if(inner){classes.push(inner)}}}else if(argType==="object"){if(arg.toString===Object.prototype.toString){for(var key in arg){if(hasOwn.call(arg,key)&&arg[key]){classes.push(key)}}}else{classes.push(arg.toString())}}}return classes.join(" ")}if(true&&module.exports){classNames.default=classNames;module.exports=classNames}else if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__))}else{}})()},169:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"default",(function(){return suggestions_component_SuggestionsComponent}));var external_osdSharedDeps_Lodash_=__webpack_require__(2);var external_osdSharedDeps_React_=__webpack_require__(3);var external_osdSharedDeps_React_default=__webpack_require__.n(external_osdSharedDeps_React_);var classnames=__webpack_require__(160);var classnames_default=__webpack_require__.n(classnames);var external_osdSharedDeps_StyledComponents_=__webpack_require__(157);var external_osdSharedDeps_StyledComponents_default=__webpack_require__.n(external_osdSharedDeps_StyledComponents_);var external_osdSharedDeps_ElasticEui_=__webpack_require__(21);function getEuiIconType(type){switch(type){case"field":return"kqlField";case"value":return"kqlValue";case"recentSearch":return"search";case"conjunction":return"kqlSelector";case"operator":return"kqlOperand";default:throw new Error("Unknown type: ".concat(type))}}function SuggestionComponent(props){return external_osdSharedDeps_React_default.a.createElement("div",{className:classnames_default()({osdTypeahead__item:true,active:props.selected}),role:"option",onClick:()=>props.onClick(props.suggestion),onMouseEnter:props.onMouseEnter,ref:props.innerRef,id:props.ariaId,"aria-selected":props.selected,"data-test-subj":"autocompleteSuggestion-".concat(props.suggestion.type,"-").concat(props.suggestion.text.replace(/\s/g,"-"))},external_osdSharedDeps_React_default.a.createElement("div",{className:"osdSuggestionItem osdSuggestionItem--"+props.suggestion.type},external_osdSharedDeps_React_default.a.createElement("div",{className:"osdSuggestionItem__type"},external_osdSharedDeps_React_default.a.createElement(external_osdSharedDeps_ElasticEui_["EuiIcon"],{type:getEuiIconType(props.suggestion.type)})),external_osdSharedDeps_React_default.a.createElement("div",{className:"osdSuggestionItem__text","data-test-subj":"autoCompleteSuggestionText"},props.suggestion.text),props.shouldDisplayDescription&&external_osdSharedDeps_React_default.a.createElement("div",{className:"osdSuggestionItem__description"},props.suggestion.description)))}const SUGGESTIONS_LIST_REQUIRED_WIDTH=600;const SUGGESTIONS_LIST_REQUIRED_BOTTOM_SPACE=250;const SUGGESTIONS_LIST_REQUIRED_TOP_OFFSET=1;function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}class suggestions_component_SuggestionsComponent extends external_osdSharedDeps_React_["Component"]{constructor(){super(...arguments);_defineProperty(this,"childNodes",[]);_defineProperty(this,"parentNode",null);_defineProperty(this,"scrollIntoView",()=>{if(this.props.index===null){return}const parent=this.parentNode;const child=this.childNodes[this.props.index];if(this.props.index==null||!parent||!child){return}const scrollTop=Math.max(Math.min(parent.scrollTop,child.offsetTop),child.offsetTop+child.offsetHeight-parent.offsetHeight);parent.scrollTop=scrollTop});_defineProperty(this,"handleScroll",()=>{if(!this.props.loadMore||!this.parentNode){return}const position=this.parentNode.scrollTop+this.parentNode.offsetHeight;const height=this.parentNode.scrollHeight;const remaining=height-position;const margin=50;if(!height||!position){return}if(remaining<=margin){this.props.loadMore()}})}render(){if(!this.props.queryBarRect||!this.props.show||Object(external_osdSharedDeps_Lodash_["isEmpty"])(this.props.suggestions)){return null}const suggestions=this.props.suggestions.map((suggestion,index)=>{const isDescriptionFittable=this.props.queryBarRect.width>=SUGGESTIONS_LIST_REQUIRED_WIDTH;return external_osdSharedDeps_React_default.a.createElement(SuggestionComponent,{innerRef:node=>this.childNodes[index]=node,selected:index===this.props.index,suggestion:suggestion,onClick:this.props.onClick,onMouseEnter:()=>this.props.onMouseEnter(index),ariaId:"suggestion-"+index,key:"".concat(suggestion.type," - ").concat(suggestion.text),shouldDisplayDescription:isDescriptionFittable})});const documentHeight=document.documentElement.clientHeight||window.innerHeight;const{queryBarRect:queryBarRect}=this.props;const isSuggestionsListFittable=documentHeight-(queryBarRect.top+queryBarRect.height)>SUGGESTIONS_LIST_REQUIRED_BOTTOM_SPACE;const verticalListPosition=isSuggestionsListFittable?"top: ".concat(window.scrollY+queryBarRect.bottom-SUGGESTIONS_LIST_REQUIRED_TOP_OFFSET,"px;"):"bottom: ".concat(documentHeight-(window.scrollY+queryBarRect.top),"px;");return external_osdSharedDeps_React_default.a.createElement(StyledSuggestionsListDiv,{queryBarRect:queryBarRect,verticalListPosition:verticalListPosition},external_osdSharedDeps_React_default.a.createElement("div",{className:classnames_default()("osdTypeahead",{"osdTypeahead--small":this.props.size==="s"})},external_osdSharedDeps_React_default.a.createElement("div",{className:classnames_default()("osdTypeahead__popover",{["osdTypeahead__popover--bottom"]:isSuggestionsListFittable,["osdTypeahead__popover--top"]:!isSuggestionsListFittable})},external_osdSharedDeps_React_default.a.createElement("div",{id:"osdTypeahead__items",role:"listbox",ref:node=>this.parentNode=node,onScroll:this.handleScroll},suggestions))))}componentDidUpdate(prevProps){if(prevProps.index!==this.props.index){this.scrollIntoView()}}}const StyledSuggestionsListDiv=external_osdSharedDeps_StyledComponents_default.a.div.withConfig({displayName:"StyledSuggestionsListDiv",componentId:"sc-b1tlry-0"})(["",""],props=>"\n      position: absolute;\n      z-index: 4001;\n      left: ".concat(props.queryBarRect.left,"px;\n      width: ").concat(props.queryBarRect.width,"px;\n      ").concat(props.verticalListPosition))}}]);