"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = exports.PluginsConfig = void 0;

var _configSchema = require("@osd/config-schema");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /*
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

const config = {
  path: 'plugins',
  schema: _configSchema.schema.object({
    initialize: _configSchema.schema.boolean({
      defaultValue: true
    }),

    /**
     * Defines an array of directories where another plugin should be loaded from.
     */
    paths: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    })
  })
};
/** @internal */

exports.config = config;

class PluginsConfig {
  /**
   * Indicates whether or not plugins should be initialized.
   */

  /**
   * Defines directories that we should scan for the plugin subdirectories.
   */

  /**
   * Defines directories where an additional plugin exists.
   */
  constructor(rawConfig, env) {
    _defineProperty(this, "initialize", void 0);

    _defineProperty(this, "pluginSearchPaths", void 0);

    _defineProperty(this, "additionalPluginPaths", void 0);

    this.initialize = rawConfig.initialize;
    this.pluginSearchPaths = env.pluginSearchPaths;
    this.additionalPluginPaths = rawConfig.paths;
  }

}

exports.PluginsConfig = PluginsConfig;