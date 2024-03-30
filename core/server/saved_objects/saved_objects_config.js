"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.savedObjectsMigrationConfig = exports.savedObjectsConfig = exports.SavedObjectConfig = void 0;

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

const savedObjectsMigrationConfig = {
  path: 'migrations',
  schema: _configSchema.schema.object({
    batchSize: _configSchema.schema.number({
      defaultValue: 100
    }),
    scrollDuration: _configSchema.schema.string({
      defaultValue: '15m'
    }),
    pollInterval: _configSchema.schema.number({
      defaultValue: 1500
    }),
    skip: _configSchema.schema.boolean({
      defaultValue: false
    })
  })
};
exports.savedObjectsMigrationConfig = savedObjectsMigrationConfig;
const savedObjectsConfig = {
  path: 'savedObjects',
  schema: _configSchema.schema.object({
    maxImportPayloadBytes: _configSchema.schema.byteSize({
      defaultValue: 26214400
    }),
    maxImportExportSize: _configSchema.schema.byteSize({
      defaultValue: 10000
    })
  })
};
exports.savedObjectsConfig = savedObjectsConfig;

class SavedObjectConfig {
  constructor(rawConfig, rawMigrationConfig) {
    _defineProperty(this, "maxImportPayloadBytes", void 0);

    _defineProperty(this, "maxImportExportSize", void 0);

    _defineProperty(this, "migration", void 0);

    this.maxImportPayloadBytes = rawConfig.maxImportPayloadBytes.getValueInBytes();
    this.maxImportExportSize = rawConfig.maxImportExportSize.getValueInBytes();
    this.migration = rawMigrationConfig;
  }

}

exports.SavedObjectConfig = SavedObjectConfig;