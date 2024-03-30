"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSchema = void 0;

var _configSchema = require("@osd/config-schema");

var _config = require("../tile_map/config");

var _config2 = require("../region_map/config");

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
const configSchema = _configSchema.schema.object({
  includeOpenSearchMapsService: _configSchema.schema.boolean({
    defaultValue: true
  }),
  proxyOpenSearchMapsServiceInMaps: _configSchema.schema.boolean({
    defaultValue: false
  }),
  showRegionDeniedWarning: _configSchema.schema.boolean({
    defaultValue: false
  }),
  tilemap: _config.configSchema,
  regionmap: _config2.configSchema,
  manifestServiceUrl: _configSchema.schema.string({
    defaultValue: ''
  }),
  opensearchManifestServiceUrl: _configSchema.schema.string({
    defaultValue: 'https://maps.opensearch.org/manifest'
  }),
  emsFileApiUrl: _configSchema.schema.string({
    defaultValue: 'https://vectors.maps.opensearch.org'
  }),
  emsTileApiUrl: _configSchema.schema.string({
    defaultValue: 'https://tiles.maps.opensearch.org'
  }),
  emsLandingPageUrl: _configSchema.schema.string({
    defaultValue: 'https://maps.opensearch.org'
  }),
  emsFontLibraryUrl: _configSchema.schema.string({
    defaultValue: 'https://tiles.maps.opensearch.org/fonts/{fontstack}/{range}.pbf'
  }),
  emsTileLayerId: _configSchema.schema.object({
    bright: _configSchema.schema.string({
      defaultValue: 'road_map'
    }),
    desaturated: _configSchema.schema.string({
      defaultValue: 'road_map_desaturated'
    }),
    dark: _configSchema.schema.string({
      defaultValue: 'dark_map'
    })
  })
});

exports.configSchema = configSchema;