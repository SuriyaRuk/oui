"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encodeVersion = encodeVersion;

var _base = require("./base64");

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

/**
 * Encode the sequence params into an "opaque" version string
 * that can be used in the saved object API in place of numeric
 * version numbers
 */
function encodeVersion(seqNo, primaryTerm) {
  if (!Number.isInteger(primaryTerm)) {
    throw new TypeError('_primary_term from opensearch must be an integer');
  }

  if (!Number.isInteger(seqNo)) {
    throw new TypeError('_seq_no from opensearch must be an integer');
  }

  return (0, _base.encodeBase64)(JSON.stringify([seqNo, primaryTerm]));
}