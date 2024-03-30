"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cefLogsSpecProvider = cefLogsSpecProvider;

var _i18n = require("@osd/i18n");

var _tutorials = require("../../services/tutorials");

var _filebeat_instructions = require("../instructions/filebeat_instructions");

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
function cefLogsSpecProvider(context) {
  const moduleName = 'cef';
  const platforms = ['OSX', 'DEB', 'RPM', 'WINDOWS'];
  return {
    id: 'cefLogs',
    name: _i18n.i18n.translate('home.tutorials.cefLogs.nameTitle', {
      defaultMessage: 'CEF logs'
    }),
    moduleName,
    category: _tutorials.TutorialsCategory.SECURITY_SOLUTION,
    shortDescription: _i18n.i18n.translate('home.tutorials.cefLogs.shortDescription', {
      defaultMessage: 'Collect Common Event Format (CEF) log data over syslog.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.cefLogs.longDescription', {
      defaultMessage: 'This is a module for receiving Common Event Format (CEF) data over \
        Syslog. When messages are received over the syslog protocol the syslog \
        input will parse the header and set the timestamp value. Then the \
        processor is applied to parse the CEF encoded data. The decoded data \
        is written into a `cef` object field. Lastly any OpenSearch Common Schema \
        (OCS) fields that can be populated with the CEF data are populated. \
        [Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.filebeat}/filebeat-module-cef.html'
      }
    }),
    euiIconType: 'logoLogging',
    artifacts: {
      dashboards: [{
        id: 'dd0bc9af-2e89-4150-9b42-62517ea56b71',
        linkLabel: _i18n.i18n.translate('home.tutorials.cefLogs.artifacts.dashboards.linkLabel', {
          defaultMessage: 'CEF Network Overview Dashboard'
        }),
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.filebeat}/exported-fields-cef.html'
      }
    },
    completionTimeMinutes: 10,
    onPrem: (0, _filebeat_instructions.onPremInstructions)(moduleName, platforms, context)
  };
}