"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aerospikeMetricsSpecProvider = aerospikeMetricsSpecProvider;

var _i18n = require("@osd/i18n");

var _metricbeat_instructions = require("../instructions/metricbeat_instructions");

var _tutorials_registry_types = require("../../services/tutorials/lib/tutorials_registry_types");

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
function aerospikeMetricsSpecProvider(context) {
  const moduleName = 'aerospike';
  return {
    id: 'aerospikeMetrics',
    name: _i18n.i18n.translate('home.tutorials.aerospikeMetrics.nameTitle', {
      defaultMessage: 'Aerospike metrics'
    }),
    moduleName,
    isBeta: false,
    category: _tutorials_registry_types.TutorialsCategory.METRICS,
    shortDescription: _i18n.i18n.translate('home.tutorials.aerospikeMetrics.shortDescription', {
      defaultMessage: 'Fetch internal metrics from the Aerospike server.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.aerospikeMetrics.longDescription', {
      defaultMessage: 'The `aerospike` Metricbeat module fetches internal metrics from Aerospike. \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.metricbeat}/metricbeat-module-aerospike.html'
      }
    }),
    euiIconType: 'logoAerospike',
    artifacts: {
      application: {
        label: _i18n.i18n.translate('home.tutorials.aerospikeMetrics.artifacts.application.label', {
          defaultMessage: 'Discover'
        }),
        path: '/app/discover#/'
      },
      dashboards: [],
      exportedFields: {
        documentationUrl: '{config.docs.beats.metricbeat}/exported-fields-aerospike.html'
      }
    },
    completionTimeMinutes: 10,
    onPrem: (0, _metricbeat_instructions.onPremInstructions)(moduleName, context)
  };
}