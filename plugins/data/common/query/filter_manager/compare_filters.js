"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareFilters = exports.COMPARE_ALL_OPTIONS = void 0;

var _lodash = require("lodash");

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
 * Include disabled, negate and store when comparing filters
 */
const COMPARE_ALL_OPTIONS = {
  index: true,
  disabled: true,
  negate: true,
  state: true,
  alias: true
};
exports.COMPARE_ALL_OPTIONS = COMPARE_ALL_OPTIONS;

const mapFilter = (filter, comparators, excludedAttributes) => {
  var _filter$meta, _filter$meta2;

  const cleaned = (0, _lodash.omit)(filter, excludedAttributes);
  if (comparators.index) cleaned.index = (_filter$meta = filter.meta) === null || _filter$meta === void 0 ? void 0 : _filter$meta.index;
  if (comparators.negate) cleaned.negate = filter.meta && Boolean(filter.meta.negate);
  if (comparators.disabled) cleaned.disabled = filter.meta && Boolean(filter.meta.disabled);
  if (comparators.alias) cleaned.alias = (_filter$meta2 = filter.meta) === null || _filter$meta2 === void 0 ? void 0 : _filter$meta2.alias;
  return cleaned;
};

const mapFilterArray = (filters, comparators, excludedAttributes) => {
  return (0, _lodash.map)(filters, filter => mapFilter(filter, comparators, excludedAttributes));
};
/**
 * Compare two filters or filter arrays to see if they match.
 * For filter arrays, the assumption is they are sorted.
 *
 * @param {Filter | Filter[]} first The first filter or filter array to compare
 * @param {Filter | Filter[]} second The second filter or filter array to compare
 * @param {FilterCompareOptions} comparatorOptions Parameters to use for comparison
 *
 * @returns {bool} Filters are the same
 */


const compareFilters = (first, second, comparatorOptions = {}) => {
  if (!first || !second) return false;
  let comparators = {};
  const excludedAttributes = ['$$hashKey', 'meta'];
  comparators = (0, _lodash.defaults)(comparatorOptions || {}, {
    index: false,
    state: false,
    negate: false,
    disabled: false,
    alias: false
  });
  if (!comparators.state) excludedAttributes.push('$state');

  if (Array.isArray(first) && Array.isArray(second)) {
    return (0, _lodash.isEqual)(mapFilterArray(first, comparators, excludedAttributes), mapFilterArray(second, comparators, excludedAttributes));
  } else if (!Array.isArray(first) && !Array.isArray(second)) {
    return (0, _lodash.isEqual)(mapFilter(first, comparators, excludedAttributes), mapFilter(second, comparators, excludedAttributes));
  } else {
    return false;
  }
};

exports.compareFilters = compareFilters;