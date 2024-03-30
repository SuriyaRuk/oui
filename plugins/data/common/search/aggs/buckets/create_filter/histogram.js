"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFilterHistogram = void 0;

var _common = require("../../../../../common");

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

/** @internal */
const createFilterHistogram = getFieldFormatsStart => {
  return (aggConfig, key) => {
    const {
      deserialize
    } = getFieldFormatsStart();
    const value = parseInt(key, 10);
    const params = {
      gte: value,
      lt: value + aggConfig.params.interval
    };
    return (0, _common.buildRangeFilter)(aggConfig.params.field, params, aggConfig.getIndexPattern(), deserialize(aggConfig.toSerializedFieldFormat()).convert(key));
  };
};

exports.createFilterHistogram = createFilterHistogram;