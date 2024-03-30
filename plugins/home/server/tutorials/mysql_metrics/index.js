"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mysqlMetricsSpecProvider = mysqlMetricsSpecProvider;

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
function mysqlMetricsSpecProvider(context) {
  const moduleName = 'mysql';
  return {
    id: 'mysqlMetrics',
    name: _i18n.i18n.translate('home.tutorials.mysqlMetrics.nameTitle', {
      defaultMessage: 'MySQL metrics'
    }),
    moduleName,
    category: _tutorials.TutorialsCategory.METRICS,
    shortDescription: _i18n.i18n.translate('home.tutorials.mysqlMetrics.shortDescription', {
      defaultMessage: 'Fetch internal metrics from MySQL.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.mysqlMetrics.longDescription', {
      defaultMessage: 'The `mysql` Metricbeat module fetches internal metrics from the MySQL server. \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.metricbeat}/metricbeat-module-mysql.html'
      }
    }),
    euiIconType: 'logoMySQL',
    artifacts: {
      dashboards: [{
        id: '66881e90-0006-11e7-bf7f-c9acc3d3e306-ecs',
        linkLabel: _i18n.i18n.translate('home.tutorials.mysqlMetrics.artifacts.dashboards.linkLabel', {
          defaultMessage: 'MySQL metrics dashboard'
        }),
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.metricbeat}/exported-fields-mysql.html'
      }
    },
    completionTimeMinutes: 10,
    onPrem: (0, _metricbeat_instructions.onPremInstructions)(moduleName, context)
  };
}