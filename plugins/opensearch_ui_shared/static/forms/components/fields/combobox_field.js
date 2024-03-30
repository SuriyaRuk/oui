"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComboBoxField = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@osd/i18n");

var _eui = require("@elastic/eui");

var _hook_form_lib = require("../../hook_form_lib");

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

const ComboBoxField = ({
  field,
  euiFieldProps = {},
  ...rest
}) => {
  // Errors for the comboBox value (the "array")
  const errorMessageField = field.getErrorsMessages(); // Errors for comboBox option added (the array "item")

  const errorMessageArrayItem = field.getErrorsMessages({
    validationType: _hook_form_lib.VALIDATION_TYPES.ARRAY_ITEM
  });
  const isInvalid = field.errors.length ? errorMessageField !== null || errorMessageArrayItem !== null : false; // Concatenate error messages.

  const errorMessage = errorMessageField && errorMessageArrayItem ? `${errorMessageField}, ${errorMessageArrayItem}` : errorMessageField ? errorMessageField : errorMessageArrayItem;

  const onCreateComboOption = value => {
    // Note: for now, all validations for a comboBox array item have to be synchronous
    // If there is a need to support asynchronous validation, we'll work on it (and will need to update the <EuiComboBox /> logic).
    const {
      isValid
    } = field.validate({
      value,
      validationType: _hook_form_lib.VALIDATION_TYPES.ARRAY_ITEM
    });

    if (!isValid) {
      // Return false to explicitly reject the user's input.
      return false;
    }

    const newValue = [...field.value, value];
    field.setValue(newValue);
  };

  const onComboChange = options => {
    field.setValue(options.map(option => option.label));
  };

  const onSearchComboChange = value => {
    if (value !== undefined) {
      field.clearErrors(_hook_form_lib.VALIDATION_TYPES.ARRAY_ITEM);
    }
  };

  return /*#__PURE__*/_react.default.createElement(_eui.EuiFormRow, {
    label: field.label,
    labelAppend: field.labelAppend,
    helpText: typeof field.helpText === 'function' ? field.helpText() : field.helpText,
    error: errorMessage,
    isInvalid: isInvalid,
    fullWidth: true,
    "data-test-subj": rest['data-test-subj'],
    describedByIds: rest.idAria ? [rest.idAria] : undefined
  }, /*#__PURE__*/_react.default.createElement(_eui.EuiComboBox, _extends({
    noSuggestions: true,
    placeholder: _i18n.i18n.translate('opensearchUi.forms.comboBoxField.placeHolderText', {
      defaultMessage: 'Type and then hit "ENTER"'
    }),
    selectedOptions: field.value.map(v => ({
      label: v
    })),
    onCreateOption: onCreateComboOption,
    onChange: onComboChange,
    onSearchChange: onSearchComboChange,
    fullWidth: true,
    "data-test-subj": "input"
  }, euiFieldProps)));
};

exports.ComboBoxField = ComboBoxField;