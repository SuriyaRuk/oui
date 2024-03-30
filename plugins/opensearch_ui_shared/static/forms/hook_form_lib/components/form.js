"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _form_context = require("../form_context");

var _form_data_context = require("../form_data_context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Any modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
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
const Form = ({
  form,
  FormWrapper = _eui.EuiForm,
  ...rest
}) => {
  const {
    getFormData,
    __getFormData$
  } = form;
  return /*#__PURE__*/_react.default.createElement(_form_data_context.FormDataContextProvider, {
    getFormData: getFormData,
    getFormData$: __getFormData$
  }, /*#__PURE__*/_react.default.createElement(_form_context.FormProvider, {
    form: form
  }, /*#__PURE__*/_react.default.createElement(FormWrapper, rest)));
};

exports.Form = Form;