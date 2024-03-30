"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SectionError = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } /*
                                                                                                                                                                                                                                                                                                                               * SPDX-License-Identifier: Apache-2.0
                                                                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                                                                               * The OpenSearch Contributors require contributions made to
                                                                                                                                                                                                                                                                                                                               * this file be licensed under the Apache-2.0 license or a
                                                                                                                                                                                                                                                                                                                               * compatible open source license.
                                                                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                                                                               * Any modifications Copyright OpenSearch Contributors. See
                                                                                                                                                                                                                                                                                                                               * GitHub history for details.
                                                                                                                                                                                                                                                                                                                               */ /*
                                                                                                                                                                                                                                                                                                                                   * Licensed to Elasticsearch B.V. under one or more contributor
                                                                                                                                                                                                                                                                                                                                   * license agreements. See the NOTICE file distributed with
                                                                                                                                                                                                                                                                                                                                   * this work for additional information regarding copyright
                                                                                                                                                                                                                                                                                                                                   * ownership. Elasticsearch B.V. licenses this file to you under
                                                                                                                                                                                                                                                                                                                                   * the Apache License, Version 2.0 (the "License"); you may
                                                                                                                                                                                                                                                                                                                                   * not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                   * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                                                                                   *    http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                                                                                   * Unless required by applicable law or agreed to in writing,
                                                                                                                                                                                                                                                                                                                                   * software distributed under the License is distributed on an
                                                                                                                                                                                                                                                                                                                                   * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
                                                                                                                                                                                                                                                                                                                                   * KIND, either express or implied.  See the License for the
                                                                                                                                                                                                                                                                                                                                   * specific language governing permissions and limitations
                                                                                                                                                                                                                                                                                                                                   * under the License.
                                                                                                                                                                                                                                                                                                                                   */

const SectionError = ({
  title,
  error,
  actions,
  ...rest
}) => {
  const {
    error: errorString,
    cause,
    // wrapOpenSearchError() on the server adds a "cause" array
    message
  } = error;
  return /*#__PURE__*/_react.default.createElement(_eui.EuiCallOut, _extends({
    title: title,
    color: "danger",
    iconType: "alert"
  }, rest), cause ? message || errorString : /*#__PURE__*/_react.default.createElement("p", null, message || errorString), cause && /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), /*#__PURE__*/_react.default.createElement("ul", null, cause.map((causeMsg, i) => /*#__PURE__*/_react.default.createElement("li", {
    key: i
  }, causeMsg)))), actions ? actions : null);
};

exports.SectionError = SectionError;