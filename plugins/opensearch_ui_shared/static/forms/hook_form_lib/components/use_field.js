"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UseField = void 0;
exports.getUseField = getUseField;

var _react = _interopRequireDefault(require("react"));

var _hooks = require("../hooks");

var _form_context = require("../form_context");

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

function UseFieldComp(props) {
  const {
    path,
    config,
    defaultValue,
    component,
    componentProps,
    readDefaultValueOnForm = true,
    onChange,
    children,
    ...rest
  } = props;
  const form = (0, _form_context.useFormContext)();
  const ComponentToRender = component !== null && component !== void 0 ? component : 'input';
  const propsToForward = { ...componentProps,
    ...rest
  };
  const fieldConfig = config !== undefined ? { ...config
  } : { ...form.__readFieldConfigFromSchema(path)
  };

  if (defaultValue !== undefined) {
    // update the form "defaultValue" ref object so when/if we reset the form we can go back to this value
    form.__updateDefaultValueAt(path, defaultValue); // Use the defaultValue prop as initial value


    fieldConfig.initialValue = defaultValue;
  } else {
    if (readDefaultValueOnForm) {
      var _ref;

      // Read the field initial value from the "defaultValue" object passed to the form
      fieldConfig.initialValue = (_ref = form.__getFieldDefaultValue(path)) !== null && _ref !== void 0 ? _ref : fieldConfig.defaultValue;
    }
  }

  const field = (0, _hooks.useField)(form, path, fieldConfig, onChange); // Children prevails over anything else provided.

  if (children) {
    return children(field);
  }

  if (ComponentToRender === 'input') {
    return /*#__PURE__*/_react.default.createElement(ComponentToRender, _extends({
      type: field.type,
      onChange: field.onChange,
      value: field.value
    }, propsToForward));
  }

  return /*#__PURE__*/_react.default.createElement(ComponentToRender, _extends({
    field
  }, propsToForward));
}

const UseField = /*#__PURE__*/_react.default.memo(UseFieldComp);
/**
 * Get a <UseField /> component providing some common props for all instances.
 * @param partialProps Partial props to apply to all <UseField /> instances
 */


exports.UseField = UseField;

function getUseField(partialProps) {
  return function (props) {
    const componentProps = { ...partialProps,
      ...props
    };
    return /*#__PURE__*/_react.default.createElement(UseField, componentProps);
  };
}