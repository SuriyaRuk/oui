"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHeartbeatInstructions = void 0;
exports.heartbeatEnableInstructionsCloud = heartbeatEnableInstructionsCloud;
exports.heartbeatEnableInstructionsOnPrem = heartbeatEnableInstructionsOnPrem;
exports.heartbeatStatusCheck = heartbeatStatusCheck;
exports.onPremInstructions = onPremInstructions;

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
const createHeartbeatInstructions = context => ({
  INSTALL: {
    OSX: {
      title: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.install.osxTitle', {
        defaultMessage: 'Download and install Heartbeat'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.install.osxTextPre', {
        defaultMessage: 'First time using Heartbeat? See the [Quick Start]({link}).',
        values: {
          link: '{config.docs.beats.heartbeat}/heartbeat-installation-configuration.html'
        }
      }),
      commands: ['curl -L -O https://artifacts.opensearch.org/downloads/beats/heartbeat/heartbeat-{config.opensearchDashboards.version}-darwin-x64.tar.gz', 'tar xzvf heartbeat-{config.opensearchDashboards.version}-darwin-x64.tar.gz', 'cd heartbeat-{config.opensearchDashboards.version}-darwin-x64/']
    },
    DEB: {
      title: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.install.debTitle', {
        defaultMessage: 'Download and install Heartbeat'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.install.debTextPre', {
        defaultMessage: 'First time using Heartbeat? See the [Quick Start]({link}).',
        values: {
          link: '{config.docs.beats.heartbeat}/heartbeat-installation-configuration.html'
        }
      }),
      commands: ['curl -L -O https://artifacts.opensearch.org/downloads/beats/heartbeat/heartbeat-{config.opensearchDashboards.version}-amd64.deb', 'sudo dpkg -i heartbeat-{config.opensearchDashboards.version}-amd64.deb'],
      textPost: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.install.debTextPost', {
        defaultMessage: 'Looking for the 32-bit packages? See the [Download page]({link}).',
        values: {
          link: 'https://opensearch.org/docs/latest/downloads/beats/heartbeat'
        }
      })
    },
    RPM: {
      title: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.install.rpmTitle', {
        defaultMessage: 'Download and install Heartbeat'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.install.rpmTextPre', {
        defaultMessage: 'First time using Heartbeat? See the [Quick Start]({link}).',
        values: {
          link: '{config.docs.beats.heartbeat}/heartbeat-installation-configuration.html'
        }
      }),
      commands: ['curl -L -O https://artifacts.opensearch.org/downloads/beats/heartbeat/heartbeat-{config.opensearchDashboards.version}-x64.rpm', 'sudo rpm -vi heartbeat-{config.opensearchDashboards.version}-x64.rpm'],
      textPost: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.install.debTextPost', {
        defaultMessage: 'Looking for the 32-bit packages? See the [Download page]({link}).',
        values: {
          link: 'https://opensearch.org/docs/latest/downloads/beats/heartbeat'
        }
      })
    },
    WINDOWS: {
      title: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.install.windowsTitle', {
        defaultMessage: 'Download and install Heartbeat'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.install.windowsTextPre', {
        defaultMessage: 'First time using Heartbeat? See the [Quick Start]({heartbeatLink}).\n\
 1. Download the Heartbeat Windows zip file from the [Download]({opensearchLink}) page.\n\
 2. Extract the contents of the zip file into {folderPath}.\n\
 3. Rename the {directoryName} directory to `Heartbeat`.\n\
 4. Open a PowerShell prompt as an Administrator (right-click the PowerShell icon and select \
**Run As Administrator**). If you are running Windows XP, you might need to download and install PowerShell.\n\
 5. From the PowerShell prompt, run the following commands to install Heartbeat as a Windows service.',
        values: {
          directoryName: '`heartbeat-{config.opensearchDashboards.version}-windows`',
          folderPath: '`C:\\Program Files`',
          heartbeatLink: '{config.docs.beats.heartbeat}/heartbeat-installation-configuration.html',
          opensearchLink: 'https://opensearch.org/docs/latest/downloads/beats/heartbeat'
        }
      }),
      commands: ['cd "C:\\Program Files\\Heartbeat"', '.\\install-service-heartbeat.ps1']
    }
  },
  START: {
    OSX: {
      title: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.start.osxTitle', {
        defaultMessage: 'Start Heartbeat'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.start.osxTextPre', {
        defaultMessage: 'The `setup` command loads the OpenSearch Dashboards index pattern.'
      }),
      commands: ['./heartbeat setup', './heartbeat -e']
    },
    DEB: {
      title: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.start.debTitle', {
        defaultMessage: 'Start Heartbeat'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.start.debTextPre', {
        defaultMessage: 'The `setup` command loads the OpenSearch Dashboards index pattern.'
      }),
      commands: ['sudo heartbeat setup', 'sudo service heartbeat-elastic start']
    },
    RPM: {
      title: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.start.rpmTitle', {
        defaultMessage: 'Start Heartbeat'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.start.rpmTextPre', {
        defaultMessage: 'The `setup` command loads the OpenSearch Dashboards index pattern.'
      }),
      commands: ['sudo heartbeat setup', 'sudo service heartbeat-elastic start']
    },
    WINDOWS: {
      title: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.start.windowsTitle', {
        defaultMessage: 'Start Heartbeat'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.start.windowsTextPre', {
        defaultMessage: 'The `setup` command loads the OpenSearch Dashboards index pattern.'
      }),
      commands: ['.\\heartbeat.exe setup', 'Start-Service heartbeat']
    }
  },
  CONFIG: {
    OSX: {
      title: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.config.osxTitle', {
        defaultMessage: 'Edit the configuration'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.config.osxTextPre', {
        defaultMessage: 'Modify {path} to set the connection information:',
        values: {
          path: '`heartbeat.yml`'
        }
      }),
      commands: ['output.opensearch:', '  hosts: ["<opensearch_url>"]', '  username: "opensearch"', '  password: "<password>"', 'setup.opensearchDashboards:', '  host: "<opensearch_dashboards_url>"', (0, _get_space_id_for_beats_tutorial.getSpaceIdForBeatsTutorial)(context)],
      textPost: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.config.osxTextPost', {
        defaultMessage: 'Where {passwordTemplate} is the password of the `opensearch` user, {opensearchUrlTemplate} is the URL of opensearch, \
and {opensearchDashboardsUrlTemplate} is the URL of OpenSearch Dashboards.',
        values: {
          passwordTemplate: '`<password>`',
          opensearchUrlTemplate: '`<opensearch_url>`',
          opensearchDashboardsUrlTemplate: '`<opensearch_dashboards_url>`'
        }
      })
    },
    DEB: {
      title: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.config.debTitle', {
        defaultMessage: 'Edit the configuration'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.config.debTextPre', {
        defaultMessage: 'Modify {path} to set the connection information:',
        values: {
          path: '`/etc/heartbeat/heartbeat.yml`'
        }
      }),
      commands: ['output.opensearch:', '  hosts: ["<opensearch_url>"]', '  username: "opensearch"', '  password: "<password>"', 'setup.opensearchDashboards:', '  host: "<opensearch_dashboards_url>"', (0, _get_space_id_for_beats_tutorial.getSpaceIdForBeatsTutorial)(context)],
      textPost: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.config.debTextPost', {
        defaultMessage: 'Where {passwordTemplate} is the password of the `opensearch` user, {opensearchUrlTemplate} is the URL of opensearch, \
and {opensearchDashboardsUrlTemplate} is the URL of OpenSearch Dashboards.',
        values: {
          passwordTemplate: '`<password>`',
          opensearchUrlTemplate: '`<opensearch_url>`',
          opensearchDashboardsUrlTemplate: '`<opensearch_dashboards_url>`'
        }
      })
    },
    RPM: {
      title: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.config.rpmTitle', {
        defaultMessage: 'Edit the configuration'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.config.rpmTextPre', {
        defaultMessage: 'Modify {path} to set the connection information:',
        values: {
          path: '`/etc/heartbeat/heartbeat.yml`'
        }
      }),
      commands: ['output.opensearch:', '  hosts: ["<opensearch_url>"]', '  username: "opensearch"', '  password: "<password>"', 'setup.opensearchDashboards:', '  host: "<opensearch_dashboards_url>"', (0, _get_space_id_for_beats_tutorial.getSpaceIdForBeatsTutorial)(context)],
      textPost: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.config.rpmTextPost', {
        defaultMessage: 'Where {passwordTemplate} is the password of the `opensearch` user, {opensearchUrlTemplate} is the URL of opensearch, \
and {opensearchDashboardsUrlTemplate} is the URL of OpenSearch Dashboards.',
        values: {
          passwordTemplate: '`<password>`',
          opensearchUrlTemplate: '`<opensearch_url>`',
          opensearchDashboardsUrlTemplate: '`<opensearch_dashboards_url>`'
        }
      })
    },
    WINDOWS: {
      title: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.config.windowsTitle', {
        defaultMessage: 'Edit the configuration'
      }),
      textPre: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.config.windowsTextPre', {
        defaultMessage: 'Modify {path} to set the connection information:',
        values: {
          path: '`C:\\Program Files\\Heartbeat\\heartbeat.yml`'
        }
      }),
      commands: ['output.opensearch:', '  hosts: ["<opensearch_url>"]', '  username: "opensearch"', '  password: "<password>"', 'setup.opensearchDashboards:', '  host: "<opensearch_dashboards_url>"', (0, _get_space_id_for_beats_tutorial.getSpaceIdForBeatsTutorial)(context)],
      textPost: _i18n.i18n.translate('home.tutorials.common.heartbeatInstructions.config.windowsTextPost', {
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

exports.createHeartbeatInstructions = createHeartbeatInstructions;

function heartbeatEnableInstructionsOnPrem() {
  const defaultTitle = _i18n.i18n.translate('home.tutorials.common.heartbeatEnableOnPremInstructions.defaultTitle', {
    defaultMessage: 'Edit the configuration - Add monitors'
  });

  const defaultCommands = ['heartbeat.monitors:', '- type: http', '  urls: ["<http://localhost:9200>"]', '  schedule: "@every 10s"'];

  const defaultTextPost = _i18n.i18n.translate('home.tutorials.common.heartbeatEnableOnPremInstructions.defaultTextPost', {
    defaultMessage: 'Where {hostTemplate} is your monitored URL, For more details on how to configure Monitors in \
      Heartbeat, read the [Heartbeat configuration docs.]({configureLink})',
    values: {
      configureLink: '{config.docs.beats.heartbeat}/configuring-howto-heartbeat.html',
      hostTemplate: '`<http://localhost:9200>`'
    }
  });

  return {
    OSX: {
      title: defaultTitle,
      textPre: _i18n.i18n.translate('home.tutorials.common.heartbeatEnableOnPremInstructions.osxTextPre', {
        defaultMessage: 'Edit the `heartbeat.monitors` setting in the `heartbeat.yml` file.'
      }),
      commands: defaultCommands,
      textPost: defaultTextPost
    },
    DEB: {
      title: defaultTitle,
      textPre: _i18n.i18n.translate('home.tutorials.common.heartbeatEnableOnPremInstructions.debTextPre', {
        defaultMessage: 'Edit the `heartbeat.monitors` setting in the `heartbeat.yml` file.'
      }),
      commands: defaultCommands,
      textPost: defaultTextPost
    },
    RPM: {
      title: defaultTitle,
      textPre: _i18n.i18n.translate('home.tutorials.common.heartbeatEnableOnPremInstructions.rpmTextPre', {
        defaultMessage: 'Edit the `heartbeat.monitors` setting in the `heartbeat.yml` file.'
      }),
      commands: defaultCommands,
      textPost: defaultTextPost
    },
    WINDOWS: {
      title: defaultTitle,
      textPre: _i18n.i18n.translate('home.tutorials.common.heartbeatEnableOnPremInstructions.windowsTextPre', {
        defaultMessage: 'Edit the `heartbeat.monitors` setting in the `heartbeat.yml` file.'
      }),
      commands: defaultCommands,
      textPost: defaultTextPost
    }
  };
}

function heartbeatEnableInstructionsCloud() {
  const defaultTitle = _i18n.i18n.translate('home.tutorials.common.heartbeatEnableCloudInstructions.defaultTitle', {
    defaultMessage: 'Edit the configuration - Add monitors'
  });

  const defaultCommands = ['heartbeat.monitors:', '- type: http', '  urls: ["http://opensearch.org"]', '  schedule: "@every 10s"'];

  const defaultTextPost = _i18n.i18n.translate('home.tutorials.common.heartbeatEnableCloudInstructions.defaultTextPost', {
    defaultMessage: 'For more details on how to configure Monitors in Heartbeat, read the [Heartbeat configuration docs.]({configureLink})',
    values: {
      configureLink: '{config.docs.beats.heartbeat}/configuring-howto-heartbeat.html'
    }
  });

  return {
    OSX: {
      title: defaultTitle,
      textPre: _i18n.i18n.translate('home.tutorials.common.heartbeatEnableCloudInstructions.osxTextPre', {
        defaultMessage: 'Edit the `heartbeat.monitors` setting in the `heartbeat.yml` file.'
      }),
      commands: defaultCommands,
      textPost: defaultTextPost
    },
    DEB: {
      title: defaultTitle,
      textPre: _i18n.i18n.translate('home.tutorials.common.heartbeatEnableCloudInstructions.debTextPre', {
        defaultMessage: 'Edit the `heartbeat.monitors` setting in the `heartbeat.yml` file.'
      }),
      commands: defaultCommands,
      textPost: defaultTextPost
    },
    RPM: {
      title: defaultTitle,
      textPre: _i18n.i18n.translate('home.tutorials.common.heartbeatEnableCloudInstructions.rpmTextPre', {
        defaultMessage: 'Edit the `heartbeat.monitors` setting in the `heartbeat.yml` file.'
      }),
      commands: defaultCommands,
      textPost: defaultTextPost
    },
    WINDOWS: {
      title: defaultTitle,
      textPre: _i18n.i18n.translate('home.tutorials.common.heartbeatEnableCloudInstructions.windowsTextPre', {
        defaultMessage: 'Edit the `heartbeat.monitors` setting in the `heartbeat.yml` file.'
      }),
      commands: defaultCommands,
      textPost: defaultTextPost
    }
  };
}

function heartbeatStatusCheck() {
  return {
    title: _i18n.i18n.translate('home.tutorials.common.heartbeatStatusCheck.title', {
      defaultMessage: 'Heartbeat status'
    }),
    text: _i18n.i18n.translate('home.tutorials.common.heartbeatStatusCheck.text', {
      defaultMessage: 'Check that data is received from Heartbeat'
    }),
    btnLabel: _i18n.i18n.translate('home.tutorials.common.heartbeatStatusCheck.buttonLabel', {
      defaultMessage: 'Check data'
    }),
    success: _i18n.i18n.translate('home.tutorials.common.heartbeatStatusCheck.successText', {
      defaultMessage: 'Data successfully received from Heartbeat'
    }),
    error: _i18n.i18n.translate('home.tutorials.common.heartbeatStatusCheck.errorText', {
      defaultMessage: 'No data has been received from Heartbeat yet'
    }),
    opensearchHitsCheck: {
      index: 'heartbeat-*',
      query: {
        match_all: {}
      }
    }
  };
}

function onPremInstructions(platforms, context) {
  const HEARTBEAT_INSTRUCTIONS = createHeartbeatInstructions(context);
  return {
    instructionSets: [{
      title: _i18n.i18n.translate('home.tutorials.common.heartbeat.premInstructions.gettingStarted.title', {
        defaultMessage: 'Getting Started'
      }),
      instructionVariants: [{
        id: _instruction_variant.INSTRUCTION_VARIANT.OSX,
        instructions: [HEARTBEAT_INSTRUCTIONS.INSTALL.OSX, HEARTBEAT_INSTRUCTIONS.CONFIG.OSX, heartbeatEnableInstructionsOnPrem().OSX, HEARTBEAT_INSTRUCTIONS.START.OSX]
      }, {
        id: _instruction_variant.INSTRUCTION_VARIANT.DEB,
        instructions: [HEARTBEAT_INSTRUCTIONS.INSTALL.DEB, HEARTBEAT_INSTRUCTIONS.CONFIG.DEB, heartbeatEnableInstructionsOnPrem().DEB, HEARTBEAT_INSTRUCTIONS.START.DEB]
      }, {
        id: _instruction_variant.INSTRUCTION_VARIANT.RPM,
        instructions: [HEARTBEAT_INSTRUCTIONS.INSTALL.RPM, HEARTBEAT_INSTRUCTIONS.CONFIG.RPM, heartbeatEnableInstructionsOnPrem().RPM, HEARTBEAT_INSTRUCTIONS.START.RPM]
      }, {
        id: _instruction_variant.INSTRUCTION_VARIANT.WINDOWS,
        instructions: [HEARTBEAT_INSTRUCTIONS.INSTALL.WINDOWS, HEARTBEAT_INSTRUCTIONS.CONFIG.WINDOWS, heartbeatEnableInstructionsOnPrem().WINDOWS, HEARTBEAT_INSTRUCTIONS.START.WINDOWS]
      }],
      statusCheck: heartbeatStatusCheck()
    }]
  };
}