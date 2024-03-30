"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.functionTestSpecs = void 0;

var _access = require("./access");

var _add = require("./add");

var _error = require("./error");

var _introspect_context = require("./introspect_context");

var _mult = require("./mult");

var _sleep = require("./sleep");

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
const functionTestSpecs = [_access.access, _add.add, _error.error, _introspect_context.introspectContext, _mult.mult, _sleep.sleep];
exports.functionTestSpecs = functionTestSpecs;