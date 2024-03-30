"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.osqueryLogsSpecProvider = osqueryLogsSpecProvider;

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
function osqueryLogsSpecProvider(context) {
  const moduleName = 'osquery';
  const platforms = ['OSX', 'DEB', 'RPM', 'WINDOWS'];
  return {
    id: 'osqueryLogs',
    name: _i18n.i18n.translate('home.tutorials.osqueryLogs.nameTitle', {
      defaultMessage: 'Osquery logs'
    }),
    moduleName,
    category: _tutorials.TutorialsCategory.SECURITY_SOLUTION,
    shortDescription: _i18n.i18n.translate('home.tutorials.osqueryLogs.shortDescription', {
      defaultMessage: 'Collect osquery logs in JSON format.'
    }),
    longDescription: _i18n.i18n.translate('home.tutorials.osqueryLogs.longDescription', {
      defaultMessage: 'The  module collects and decodes the result logs written by \
        [osqueryd](https://osquery.readthedocs.io/en/latest/introduction/using-osqueryd/) in \
        the JSON format. To set up osqueryd follow the osquery installation instructions for \
        your operating system and configure the `filesystem` logging driver (the default). \
        Make sure UTC timestamps are enabled. \
        [Learn more]({learnMoreLink}).',
      values: {
        learnMoreLink: '{config.docs.beats.filebeat}/filebeat-module-osquery.html'
      }
    }),
    euiIconType: '/plugins/home/assets/tutorials/logos/osquery.svg',
    artifacts: {
      dashboards: [{
        id: '69f5ae20-eb02-11e7-8f04-51231daa5b05-ecs',
        linkLabel: _i18n.i18n.translate('home.tutorials.osqueryLogs.artifacts.dashboards.linkLabel', {
          defaultMessage: 'Osquery Compliance Pack'
        }),
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.filebeat}/exported-fields-osquery.html'
      }
    },
    completionTimeMinutes: 10,
    onPrem: (0, _filebeat_instructions.onPremInstructions)(moduleName, platforms, context)
  };
}