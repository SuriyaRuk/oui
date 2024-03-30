"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.windowsEventLogsSpecProvider = windowsEventLogsSpecProvider;

var _i18n = require("@osd/i18n");

var _tutorials = require("../../services/tutorials");

var _winlogbeat_instructions = require("../instructions/winlogbeat_instructions");

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
function windowsEventLogsSpecProvider(context) {
  const moduleName = 'windows';
  return {
    id: 'windowsEventLogs',
    name: _i18n.i18n.translate('home.tutorials.windowsEventLogs.nameTitle', {
      defaultMessage: 'Windows Event Log'
    }),
    moduleName,
    isBeta: false,
    category: _tutorials.TutorialsCategory.SECURITY_SOLUTION,
    shortDescription: _i18n.i18n.translate('home.tutorials.windowsEventLogs.shortDescription', {
      defaultMessage: 'Fetch logs from the Windows Event Log.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.windowsEventLogs.longDescription', {
      defaultMessage: 'Use Winlogbeat to collect the logs from the Windows Event Log. \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.winlogbeat}/index.html'
      }
    }),
    euiIconType: 'logoWindows',
    artifacts: {
      application: {
        label: _i18n.i18n.translate('home.tutorials.windowsEventLogs.artifacts.application.label', {
          defaultMessage: 'SIEM App'
        }),
        path: '/app/siem'
      },
      dashboards: [],
      exportedFields: {
        documentationUrl: '{config.docs.beats.winlogbeat}/exported-fields.html'
      }
    },
    completionTimeMinutes: 10,
    onPrem: (0, _winlogbeat_instructions.onPremInstructions)(context)
  };
}