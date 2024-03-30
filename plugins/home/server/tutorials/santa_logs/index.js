"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.santaLogsSpecProvider = santaLogsSpecProvider;

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
function santaLogsSpecProvider(context) {
  const moduleName = 'santa';
  const platforms = ['OSX'];
  return {
    id: 'santaLogs',
    name: _i18n.i18n.translate('home.tutorials.santaLogs.nameTitle', {
      defaultMessage: 'Google Santa logs'
    }),
    moduleName,
    category: _tutorials.TutorialsCategory.SECURITY_SOLUTION,
    shortDescription: _i18n.i18n.translate('home.tutorials.santaLogs.shortDescription', {
      defaultMessage: 'Collect Google Santa logs about process executions on MacOS.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.santaLogs.longDescription', {
      defaultMessage: 'The  module collects and parses logs from [Google Santa](https://github.com/google/santa), \
        a security tool for macOS that monitors process executions and can denylist/allowlist binaries. \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.filebeat}/filebeat-module-santa.html'
      }
    }),
    euiIconType: 'logoLogging',
    artifacts: {
      dashboards: [{
        id: '161855f0-ff6a-11e8-93c5-d5ecd1b3e307-ecs',
        linkLabel: _i18n.i18n.translate('home.tutorials.santaLogs.artifacts.dashboards.linkLabel', {
          defaultMessage: 'Santa Overview'
        }),
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.filebeat}/exported-fields-santa.html'
      }
    },
    completionTimeMinutes: 10,
    onPrem: (0, _filebeat_instructions.onPremInstructions)(moduleName, platforms, context)
  };
}