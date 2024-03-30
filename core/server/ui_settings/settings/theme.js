"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getThemeSettings = void 0;

var _configSchema = require("@osd/config-schema");

var _i18n = require("@osd/i18n");

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
const getThemeSettings = () => {
  return {
    'theme:darkMode': {
      name: _i18n.i18n.translate('core.ui_settings.params.darkModeTitle', {
        defaultMessage: 'Dark mode'
      }),
      value: false,
      description: _i18n.i18n.translate('core.ui_settings.params.darkModeText', {
        defaultMessage: `Enable a dark mode for the OpenSearch Dashboards UI. A page refresh is required for the setting to be applied.`
      }),
      requiresPageReload: true,
      category: ['appearance'],
      schema: _configSchema.schema.boolean()
    },
    'theme:version': {
      name: _i18n.i18n.translate('core.ui_settings.params.themeVersionTitle', {
        defaultMessage: 'Theme version'
      }),
      value: 'Next (preview)',
      type: 'select',
      options: ['v7', 'Next (preview)'],
      description: _i18n.i18n.translate('core.ui_settings.params.themeVersionText', {
        defaultMessage: `<p>Switch between the themes used for the current and next versions of OpenSearch Dashboards. A page refresh is required for the setting to be applied.</p><p><a href="{href}">{linkText}</a></p>`,
        values: {
          href: 'https://forum.opensearch.org/t/feedback-on-dark-mode-experience/15725',
          linkText: 'Theme feedback'
        }
      }),
      requiresPageReload: true,
      category: ['appearance'],
      schema: _configSchema.schema.oneOf([_configSchema.schema.literal('v7'), _configSchema.schema.literal('Next (preview)')])
    }
  };
};

exports.getThemeSettings = getThemeSettings;