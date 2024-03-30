"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mongodbMetricsSpecProvider = mongodbMetricsSpecProvider;

var _i18n = require("@osd/i18n");

var _tutorials = require("../../services/tutorials");

var _metricbeat_instructions = require("../instructions/metricbeat_instructions");

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
function mongodbMetricsSpecProvider(context) {
  const moduleName = 'mongodb';
  return {
    id: 'mongodbMetrics',
    name: _i18n.i18n.translate('home.tutorials.mongodbMetrics.nameTitle', {
      defaultMessage: 'MongoDB metrics'
    }),
    moduleName,
    category: _tutorials.TutorialsCategory.METRICS,
    shortDescription: _i18n.i18n.translate('home.tutorials.mongodbMetrics.shortDescription', {
      defaultMessage: 'Fetch internal metrics from MongoDB.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.mongodbMetrics.longDescription', {
      defaultMessage: 'The `mongodb` Metricbeat module fetches internal metrics from the MongoDB server. \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.metricbeat}/metricbeat-module-mongodb.html'
      }
    }),
    euiIconType: 'logoMongodb',
    artifacts: {
      dashboards: [{
        id: 'Metricbeat-MongoDB-ecs',
        linkLabel: _i18n.i18n.translate('home.tutorials.mongodbMetrics.artifacts.dashboards.linkLabel', {
          defaultMessage: 'MongoDB metrics dashboard'
        }),
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.metricbeat}/exported-fields-mongodb.html'
      }
    },
    completionTimeMinutes: 10,
    onPrem: (0, _metricbeat_instructions.onPremInstructions)(moduleName, context)
  };
}