"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidOpenSearchIntervalFormatError = void 0;

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
class InvalidOpenSearchIntervalFormatError extends Error {
  constructor(interval) {
    super(_i18n.i18n.translate('data.parseOpenSearchInterval.invalidOpenSearchIntervalFormatErrorMessage', {
      defaultMessage: 'Invalid interval format: {interval}',
      values: {
        interval
      }
    }));
    this.interval = interval;
    this.name = 'InvalidOpenSearchIntervalFormatError'; // captureStackTrace is only available in the V8 engine, so any browser using
    // a different JS engine won't have access to this method.

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidOpenSearchIntervalFormatError);
    } // Babel doesn't support traditional `extends` syntax for built-in classes.
    // https://babeljs.io/docs/en/caveats/#classes


    Object.setPrototypeOf(this, InvalidOpenSearchIntervalFormatError.prototype);
  }

}

exports.InvalidOpenSearchIntervalFormatError = InvalidOpenSearchIntervalFormatError;