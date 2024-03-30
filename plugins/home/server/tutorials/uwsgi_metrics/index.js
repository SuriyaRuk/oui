"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uwsgiMetricsSpecProvider = uwsgiMetricsSpecProvider;

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
function uwsgiMetricsSpecProvider(context) {
  const moduleName = 'uwsgi';
  return {
    id: 'uwsgiMetrics',
    name: _i18n.i18n.translate('home.tutorials.uwsgiMetrics.nameTitle', {
      defaultMessage: 'uWSGI metrics'
    }),
    moduleName,
    category: _tutorials.TutorialsCategory.METRICS,
    shortDescription: _i18n.i18n.translate('home.tutorials.uwsgiMetrics.shortDescription', {
      defaultMessage: 'Fetch internal metrics from the uWSGI server.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.uwsgiMetrics.longDescription', {
      defaultMessage: 'The `uwsgi` Metricbeat module fetches internal metrics from the uWSGI server. \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.metricbeat}/metricbeat-module-uwsgi.html'
      }
    }),
    euiIconType: '/plugins/home/assets/tutorials/logos/uwsgi.svg',
    isBeta: false,
    artifacts: {
      dashboards: [{
        id: '32fca290-f0af-11e7-b9ff-9f96241065de-ecs',
        linkLabel: _i18n.i18n.translate('home.tutorials.uwsgiMetrics.artifacts.dashboards.linkLabel', {
          defaultMessage: 'uWSGI metrics dashboard'
        }),
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.metricbeat}/exported-fields-uwsgi.html'
      }
    },
    completionTimeMinutes: 10,
    onPrem: (0, _metricbeat_instructions.onPremInstructions)(moduleName, context)
  };
}