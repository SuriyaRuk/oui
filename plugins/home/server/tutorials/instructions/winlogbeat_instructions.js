"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createWinlogbeatInstructions = void 0;
exports.onPremInstructions = onPremInstructions;
exports.winlogbeatStatusCheck = winlogbeatStatusCheck;

var _i18n = require("@osd/i18n");

var _instruction_variant = require("../../../common/instruction_variant");

var _get_space_id_for_beats_tutorial = require("./get_space_id_for_beats_tutorial");

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
const createWinlogbeatInstructions = context => ({
  INSTALL: {
    WINDOWS: {
      title: _i18n.i18n.translate('home.tutorials.common.winlogbeatInstructions.install.windowsTitle', {
        defaultMessage: 'Download and install Winlogbeat'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.winlogbeatInstructions.install.windowsTextPre', {
        defaultMessage: 'First time using Winlogbeat? See the [Quick Start]({winlogbeatLink}).\n\
 1. Download the Winlogbeat Windows zip file from the [Download]({opensearchLink}) page.\n\
 2. Extract the contents of the zip file into {folderPath}.\n\
 3. Rename the {directoryName} directory to `Winlogbeat`.\n\
 4. Open a PowerShell prompt as an Administrator (right-click the PowerShell icon and select \
**Run As Administrator**). If you are running Windows XP, you might need to download and install PowerShell.\n\
 5. From the PowerShell prompt, run the following commands to install Winlogbeat as a Windows service.',
        values: {
          directoryName: '`winlogbeat-{config.opensearchDashboards.version}-windows`',
          folderPath: '`C:\\Program Files`',
          winlogbeatLink: '{config.docs.beats.winlogbeat}/winlogbeat-installation-configuration.html',
          opensearchLink: 'https://opensearch.org/downloads/beats/winlogbeat'
        }
      }),
      commands: ['cd "C:\\Program Files\\Winlogbeat"', '.\\install-service-winlogbeat.ps1'],
      textPost: _i18n.i18n.translate('home.tutorials.common.winlogbeatInstructions.install.windowsTextPost', {
        defaultMessage: 'Modify the settings under `output.opensearch` in the {path} file to point to your opensearch installation.',
        values: {
          path: '`C:\\Program Files\\Winlogbeat\\winlogbeat.yml`'
        }
      })
    }
  },
  START: {
    WINDOWS: {
      title: _i18n.i18n.translate('home.tutorials.common.winlogbeatInstructions.start.windowsTitle', {
        defaultMessage: 'Start Winlogbeat'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.winlogbeatInstructions.start.windowsTextPre', {
        defaultMessage: 'The `setup` command loads the OpenSearch Dashboards dashboards. If the dashboards are already set up, omit this command.'
      }),
      commands: ['.\\winlogbeat.exe setup', 'Start-Service winlogbeat']
    }
  },
  CONFIG: {
    WINDOWS: {
      title: _i18n.i18n.translate('home.tutorials.common.winlogbeatInstructions.config.windowsTitle', {
        defaultMessage: 'Edit the configuration'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.winlogbeatInstructions.config.windowsTextPre', {
        defaultMessage: 'Modify {path} to set the connection information:',
        values: {
          path: '`C:\\Program Files\\Winlogbeat\\winlogbeat.yml`'
        }
      }),
      commands: ['output.opensearch:', '  hosts: ["<opensearch_url>"]', '  username: "opensearch"', '  password: "<password>"', 'setup.opensearchDashboards:', '  host: "<opensearch_dashboards_url>"', (0, _get_space_id_for_beats_tutorial.getSpaceIdForBeatsTutorial)(context)],
      textPost: _i18n.i18n.translate('home.tutorials.common.winlogbeatInstructions.config.windowsTextPost', {
        defaultMessage: 'Where {passwordTemplate} is the password of the `opensearch` user, {opensearchUrlTemplate} is the URL of opensearch, \
and {opensearchDashboardsUrlTemplate} is the URL of OpenSearch Dashboards.',
        values: {
          passwordTemplate: '`<password>`',
          opensearchUrlTemplate: '`<opensearch_url>`',
          opensearchDashboardsUrlTemplate: '`<opensearch_dashboards_url>`'
        }
      })
    }
  }
});

exports.createWinlogbeatInstructions = createWinlogbeatInstructions;

function winlogbeatStatusCheck() {
  return {
    title: _i18n.i18n.translate('home.tutorials.common.winlogbeatStatusCheck.title', {
      defaultMessage: 'Module status'
    }),
    text: _i18n.i18n.translate('home.tutorials.common.winlogbeatStatusCheck.text', {
      defaultMessage: 'Check that data is received from Winlogbeat'
    }),
    btnLabel: _i18n.i18n.translate('home.tutorials.common.winlogbeatStatusCheck.buttonLabel', {
      defaultMessage: 'Check data'
    }),
    success: _i18n.i18n.translate('home.tutorials.common.winlogbeatStatusCheck.successText', {
      defaultMessage: 'Data successfully received'
    }),
    error: _i18n.i18n.translate('home.tutorials.common.winlogbeatStatusCheck.errorText', {
      defaultMessage: 'No data has been received yet'
    }),
    opensearchHitsCheck: {
      index: 'winlogbeat-*',
      query: {
        bool: {
          filter: {
            term: {
              'agent.type': 'winlogbeat'
            }
          }
        }
      }
    }
  };
}

function onPremInstructions(context) {
  const WINLOGBEAT_INSTRUCTIONS = createWinlogbeatInstructions(context);
  return {
    instructionSets: [{
      title: _i18n.i18n.translate('home.tutorials.common.winlogbeat.premInstructions.gettingStarted.title', {
        defaultMessage: 'Getting Started'
      }),
      instructionVariants: [{
        id: _instruction_variant.INSTRUCTION_VARIANT.WINDOWS,
        instructions: [WINLOGBEAT_INSTRUCTIONS.INSTALL.WINDOWS, WINLOGBEAT_INSTRUCTIONS.CONFIG.WINDOWS, WINLOGBEAT_INSTRUCTIONS.START.WINDOWS]
      }],
      statusCheck: winlogbeatStatusCheck()
    }]
  };
}