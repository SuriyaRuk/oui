"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mssqlLogsSpecProvider = mssqlLogsSpecProvider;

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
function mssqlLogsSpecProvider(context) {
  const moduleName = 'mssql';
  const platforms = ['DEB', 'RPM', 'WINDOWS'];
  return {
    id: 'mssqlLogs',
    name: _i18n.i18n.translate('home.tutorials.mssqlLogs.nameTitle', {
      defaultMessage: 'MSSQL logs'
    }),
    moduleName,
    category: _tutorials.TutorialsCategory.LOGGING,
    shortDescription: _i18n.i18n.translate('home.tutorials.mssqlLogs.shortDescription', {
      defaultMessage: 'Collect MSSQL logs.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.mssqlLogs.longDescription', {
      defaultMessage: 'The  module parses error logs created by MSSQL. \
[Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.filebeat}/filebeat-module-mssql.html'
      }
    }),
    euiIconType: '/plugins/home/assets/tutorials/logos/microsoft.svg',
    artifacts: {
      dashboards: [],
      application: {
        label: _i18n.i18n.translate('home.tutorials.mssqlLogs.artifacts.application.label', {
          defaultMessage: 'Discover'
        }),
        path: '/app/discover#/'
      },
      exportedFields: {
        documentationUrl: '{config.docs.beats.filebeat}/exported-fields-mssql.html'
      }
    },
    completionTimeMinutes: 10,
    onPrem: (0, _filebeat_instructions.onPremInstructions)(moduleName, platforms, context)
  };
}