"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.num = void 0;

var _i18n = require("@osd/i18n");

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
const num = {
  name: 'num',
  from: {
    null: () => ({
      type: 'num',
      value: 0
    }),
    boolean: b => ({
      type: 'num',
      value: Number(b)
    }),
    string: n => {
      const value = Number(n);

      if (Number.isNaN(value)) {
        throw new Error(_i18n.i18n.translate('expressions.types.number.fromStringConversionErrorMessage', {
          defaultMessage: 'Can\'t typecast "{string}" string to number',
          values: {
            string: n
          }
        }));
      }

      return {
        type: 'num',
        value
      };
    },
    '*': value => ({
      type: 'num',
      value: Number(value)
    })
  },
  to: {
    render: ({
      value
    }) => {
      const text = `${value}`;
      return {
        type: 'render',
        as: 'text',
        value: {
          text
        }
      };
    },
    datatable: ({
      value
    }) => ({
      type: 'datatable',
      columns: [{
        id: 'value',
        name: 'value',
        meta: {
          type: 'number'
        }
      }],
      rows: [{
        value
      }]
    })
  }
};
exports.num = num;