"use strict";

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
module.exports = {
  osdBundlesLoaderSource: `(${osdBundlesLoader.toString()})();`
};

function osdBundlesLoader() {
  var modules = {};

  function has(prop) {
    return Object.prototype.hasOwnProperty.call(modules, prop);
  }

  function define(key, bundleRequire, bundleModuleKey) {
    if (has(key)) {
      throw new Error('__osdBundles__ already has a module defined for "' + key + '"');
    }

    modules[key] = {
      bundleRequire,
      bundleModuleKey
    };
  }

  function get(key) {
    if (!has(key)) {
      throw new Error('__osdBundles__ does not have a module defined for "' + key + '"');
    }

    return modules[key].bundleRequire(modules[key].bundleModuleKey);
  }

  return {
    has: has,
    define: define,
    get: get
  };
}