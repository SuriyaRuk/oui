"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormRow = exports.FormRow = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _field = require("./field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function isTitleString(title) {
  return typeof title === 'string' || title.type.name === 'FormattedMessage';
}

const FormRow = ({
  title,
  idAria,
  description,
  field,
  children,
  titleTag = 'h4',
  ...rest
}) => {
  let titleWrapped; // If a string is provided, create a default Euititle of size "m"

  if (isTitleString(title)) {
    // Create the correct title tag
    const titleWithHTag = /*#__PURE__*/_react.default.createElement(titleTag, undefined, title);

    titleWrapped = /*#__PURE__*/_react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, titleWithHTag);
  } else {
    titleWrapped = title;
  }

  return /*#__PURE__*/_react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: titleWrapped,
    description: description,
    fullWidth: true
  }, children ? children : field ? /*#__PURE__*/_react.default.createElement(_field.Field, _extends({
    field: field
  }, rest)) : null);
};
/**
 * Get a <FormRow /> component providing some common props for all instances.
 * @param partialProps Partial props to apply to all <FormRow /> instances
 */


exports.FormRow = FormRow;

const getFormRow = partialProps => props => {
  const componentProps = { ...partialProps,
    ...props
  };
  return /*#__PURE__*/_react.default.createElement(FormRow, componentProps);
};

exports.getFormRow = getFormRow;