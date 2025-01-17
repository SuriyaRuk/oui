"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiSettings = void 0;

var _i18n = require("@osd/i18n");

var _configSchema = require("@osd/config-schema");

var _common = require("../common");

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
const uiSettings = {
  [_common.DIMMING_OPACITY_SETTING]: {
    name: _i18n.i18n.translate('visTypeVislib.advancedSettings.visualization.dimmingOpacityTitle', {
      defaultMessage: 'Dimming opacity'
    }),
    value: 0.5,
    type: 'number',
    description: _i18n.i18n.translate('visTypeVislib.advancedSettings.visualization.dimmingOpacityText', {
      defaultMessage: 'The opacity of the chart items that are dimmed when highlighting another element of the chart. ' + 'The lower this number, the more the highlighted element will stand out. ' + 'This must be a number between 0 and 1.'
    }),
    category: ['visualization'],
    schema: _configSchema.schema.number()
  },
  [_common.HEATMAP_MAX_BUCKETS_SETTING]: {
    name: _i18n.i18n.translate('visTypeVislib.advancedSettings.visualization.heatmap.maxBucketsTitle', {
      defaultMessage: 'Heatmap maximum buckets'
    }),
    value: 50,
    type: 'number',
    description: _i18n.i18n.translate('visTypeVislib.advancedSettings.visualization.heatmap.maxBucketsText', {
      defaultMessage: 'The maximum number of buckets a single datasource can return. ' + 'A higher number might have negative impact on browser rendering performance'
    }),
    category: ['visualization'],
    schema: _configSchema.schema.number()
  }
};
exports.uiSettings = uiSettings;