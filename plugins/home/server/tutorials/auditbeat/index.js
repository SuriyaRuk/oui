"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auditbeatSpecProvider = auditbeatSpecProvider;

var _i18n = require("@osd/i18n");

var _tutorials = require("../../services/tutorials");

var _auditbeat_instructions = require("../instructions/auditbeat_instructions");

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
function auditbeatSpecProvider(context) {
  const platforms = ['OSX', 'DEB', 'RPM', 'WINDOWS'];
  const moduleName = 'auditbeat';
  return {
    id: 'auditbeat',
    name: _i18n.i18n.translate('home.tutorials.auditbeat.nameTitle', {
      defaultMessage: 'Auditbeat'
    }),
    moduleName,
    category: _tutorials.TutorialsCategory.SECURITY_SOLUTION,
    shortDescription: _i18n.i18n.translate('home.tutorials.auditbeat.shortDescription', {
      defaultMessage: 'Collect audit data from your hosts.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.auditbeat.longDescription', {
      defaultMessage: 'Use Auditbeat to collect auditing data from your hosts. These include \
processes, users, logins, sockets information, file accesses, and more. \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.auditbeat}/auditbeat-overview.html'
      }
    }),
    euiIconType: 'securityAnalyticsApp',
    artifacts: {
      dashboards: [],
      application: {
        path: '/app/security',
        label: _i18n.i18n.translate('home.tutorials.auditbeat.artifacts.dashboards.linkLabel', {
          defaultMessage: 'Security App'
        })
      },
      exportedFields: {
        documentationUrl: '{config.docs.beats.auditbeat}/exported-fields.html'
      }
    },
    completionTimeMinutes: 10,
    onPrem: (0, _auditbeat_instructions.onPremInstructions)(platforms, context)
  };
}