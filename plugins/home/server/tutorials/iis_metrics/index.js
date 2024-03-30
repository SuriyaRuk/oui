"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iisMetricsSpecProvider = iisMetricsSpecProvider;

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
function iisMetricsSpecProvider(context) {
  const moduleName = 'iis';
  return {
    id: 'iisMetrics',
    name: _i18n.i18n.translate('home.tutorials.iisMetrics.nameTitle', {
      defaultMessage: 'IIS Metrics'
    }),
    moduleName,
    category: _tutorials.TutorialsCategory.METRICS,
    shortDescription: _i18n.i18n.translate('home.tutorials.iisMetrics.shortDescription', {
      defaultMessage: 'Collect IIS server related metrics.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.iisMetrics.longDescription', {
      defaultMessage: 'The `iis` Metricbeat module collects metrics from IIS server and the application pools and websites running. \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.metricbeat}/metricbeat-module-iis.html'
      }
    }),
    isBeta: true,
    euiIconType: '/plugins/home/assets/tutorials/logos/iis.svg',
    artifacts: {
      dashboards: [{
        id: 'ebc23240-8572-11ea-91bc-ab084c7ec0e7',
        linkLabel: _i18n.i18n.translate('home.tutorials.iisMetrics.artifacts.dashboards.linkLabel', {
          defaultMessage: 'IIS metrics dashboard'
        }),
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.metricbeat}/exported-fields-iis.html'
      }
    },
    completionTimeMinutes: 10,
    onPrem: (0, _metricbeat_instructions.onPremInstructions)(moduleName, context)
  };
}