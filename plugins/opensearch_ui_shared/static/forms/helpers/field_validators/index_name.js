"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexNameField = void 0;

var _public = require("../../../../public");

var _string = require("../../../validators/string");

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
const indexNameField = i18n => (...args) => {
  const [{
    value
  }] = args;

  if ((0, _string.startsWith)('.')(value)) {
    return {
      code: 'ERR_FIELD_FORMAT',
      formatType: 'INDEX_NAME',
      message: i18n.translate('opensearchUi.forms.fieldValidation.indexNameStartsWithDotError', {
        defaultMessage: 'The index name cannot start with a dot (.).'
      })
    };
  }

  const {
    doesContain: doesContainSpaces
  } = (0, _string.containsChars)(' ')(value);

  if (doesContainSpaces) {
    return {
      code: 'ERR_FIELD_FORMAT',
      formatType: 'INDEX_NAME',
      message: i18n.translate('opensearchUi.forms.fieldValidation.indexNameSpacesError', {
        defaultMessage: 'The index name cannot contain spaces.'
      })
    };
  }

  const {
    charsFound,
    doesContain
  } = (0, _string.containsChars)(_public.indices.INDEX_ILLEGAL_CHARACTERS_VISIBLE)(value);

  if (doesContain) {
    return {
      message: i18n.translate('opensearchUi.forms.fieldValidation.indexNameInvalidCharactersError', {
        defaultMessage: 'The index name contains the invalid {characterListLength, plural, one {character} other {characters}} { characterList }.',
        values: {
          characterList: charsFound.join(' '),
          characterListLength: charsFound.length
        }
      })
    };
  }
};

exports.indexNameField = indexNameField;