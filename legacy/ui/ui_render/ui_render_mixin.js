"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiRenderMixin = uiRenderMixin;

var _crypto = require("crypto");

var _boom = _interopRequireDefault(require("@hapi/boom"));

var _i18n = require("@osd/i18n");

var UiSharedDeps = _interopRequireWildcard(require("@osd/ui-shared-deps"));

var _server = require("../../../core/server");

var _bootstrap = require("./bootstrap");

var _apm = require("../apm");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/**
 * @typedef {import('../../server/osd_server').default} OsdServer
 * @typedef {import('../../server/osd_server').ResponseToolkit} ResponseToolkit
 */

/**
 *
 * @param {OsdServer} osdServer
 * @param {OsdServer['server']} server
 * @param {OsdServer['config']} config
 */
function uiRenderMixin(osdServer, server, config) {
  const translationsCache = {
    translations: null,
    hash: null
  };
  server.route({
    path: '/translations/{locale}.json',
    method: 'GET',
    config: {
      auth: false
    },

    handler(request, h) {
      // OpenSearch Dashboards server loads translations only for a single locale
      // that is specified in `i18n.locale` config value.
      const {
        locale
      } = request.params;

      if (_i18n.i18n.getLocale() !== locale.toLowerCase()) {
        throw _boom.default.notFound(`Unknown locale: ${locale}`);
      } // Stringifying thousands of labels and calculating hash on the resulting
      // string can be expensive so it makes sense to do it once and cache.


      if (translationsCache.translations == null) {
        translationsCache.translations = JSON.stringify(_i18n.i18n.getTranslation());
        translationsCache.hash = (0, _crypto.createHash)('sha1').update(translationsCache.translations).digest('hex');
      }

      return h.response(translationsCache.translations).header('cache-control', 'must-revalidate').header('content-type', 'application/json').etag(translationsCache.hash);
    }

  });
  const authEnabled = !!server.auth.settings.default;
  server.route({
    path: '/bootstrap.js',
    method: 'GET',
    config: {
      tags: ['api'],
      auth: authEnabled ? {
        mode: 'try'
      } : false
    },

    async handler(request, h) {
      const soClient = osdServer.newPlatform.start.core.savedObjects.getScopedClient(_server.OpenSearchDashboardsRequest.from(request));
      const uiSettings = osdServer.newPlatform.start.core.uiSettings.asScopedToClient(soClient);
      const darkMode = !authEnabled || request.auth.isAuthenticated ? await uiSettings.get('theme:darkMode') : uiSettings.getOverrideOrDefault('theme:darkMode');
      const themeVersion = !authEnabled || request.auth.isAuthenticated ? await uiSettings.get('theme:version') : uiSettings.getOverrideOrDefault('theme:version'); // Next (preview) label is mapped to v8 here

      const themeTag = `${themeVersion === 'v7' ? 'v7' : 'v8'}${darkMode ? 'dark' : 'light'}`;
      const buildHash = server.newPlatform.env.packageInfo.buildNum;
      const basePath = config.get('server.basePath');
      const regularBundlePath = `${basePath}/${buildHash}/bundles`;
      const styleSheetPaths = [`${regularBundlePath}/osd-ui-shared-deps/${UiSharedDeps.baseCssDistFilename}`, ...(darkMode ? [themeVersion === 'v7' ? `${regularBundlePath}/osd-ui-shared-deps/${UiSharedDeps.darkCssDistFilename}` : `${regularBundlePath}/osd-ui-shared-deps/${UiSharedDeps.darkV8CssDistFilename}`, themeVersion === 'v7' ? `${basePath}/node_modules/@osd/ui-framework/dist/kui_dark.css` : `${basePath}/node_modules/@osd/ui-framework/dist/kui_next_dark.css`, `${basePath}/ui/legacy_dark_theme.css`] : [themeVersion === 'v7' ? `${regularBundlePath}/osd-ui-shared-deps/${UiSharedDeps.lightCssDistFilename}` : `${regularBundlePath}/osd-ui-shared-deps/${UiSharedDeps.lightV8CssDistFilename}`, themeVersion === 'v7' ? `${basePath}/node_modules/@osd/ui-framework/dist/kui_light.css` : `${basePath}/node_modules/@osd/ui-framework/dist/kui_next_light.css`, `${basePath}/ui/legacy_light_theme.css`])];
      const kpUiPlugins = osdServer.newPlatform.__internals.uiPlugins;
      const kpPluginPublicPaths = new Map();
      const kpPluginBundlePaths = new Set(); // recursively iterate over the kpUiPlugin ids and their required bundles
      // to populate kpPluginPublicPaths and kpPluginBundlePaths

      (function readKpPlugins(ids) {
        for (const id of ids) {
          if (kpPluginPublicPaths.has(id)) {
            continue;
          }

          kpPluginPublicPaths.set(id, `${regularBundlePath}/plugin/${id}/`);
          kpPluginBundlePaths.add(`${regularBundlePath}/plugin/${id}/${id}.plugin.js`);
          readKpPlugins(kpUiPlugins.internal.get(id).requiredBundles);
        }
      })(kpUiPlugins.public.keys());

      const jsDependencyPaths = [...UiSharedDeps.jsDepFilenames.map(filename => `${regularBundlePath}/osd-ui-shared-deps/${filename}`), `${regularBundlePath}/osd-ui-shared-deps/${UiSharedDeps.jsFilename}`, `${regularBundlePath}/core/core.entry.js`, ...kpPluginBundlePaths]; // These paths should align with the bundle routes configured in
      // src/optimize/bundles_route/bundles_route.ts

      const publicPathMap = JSON.stringify({
        core: `${regularBundlePath}/core/`,
        'osd-ui-shared-deps': `${regularBundlePath}/osd-ui-shared-deps/`,
        ...Object.fromEntries(kpPluginPublicPaths)
      });
      const bootstrap = new _bootstrap.AppBootstrap({
        templateData: {
          themeTag,
          jsDependencyPaths,
          styleSheetPaths,
          publicPathMap
        }
      });
      const body = await bootstrap.getJsFile();
      const etag = await bootstrap.getJsFileHash();
      return h.response(body).header('cache-control', 'must-revalidate').header('content-type', 'application/javascript').etag(etag);
    }

  });
  server.route({
    path: '/app/{id}/{any*}',
    method: 'GET',

    async handler(req, h) {
      try {
        return await h.renderApp();
      } catch (err) {
        throw _boom.default.boomify(err);
      }
    }

  });

  async function renderApp(h) {
    const {
      http
    } = osdServer.newPlatform.setup.core;
    const {
      savedObjects
    } = osdServer.newPlatform.start.core;
    const {
      rendering
    } = osdServer.newPlatform.__internals;

    const req = _server.OpenSearchDashboardsRequest.from(h.request);

    const uiSettings = osdServer.newPlatform.start.core.uiSettings.asScopedToClient(savedObjects.getScopedClient(req));
    const vars = {
      apmConfig: (0, _apm.getApmConfig)(h.request.path)
    };
    const content = await rendering.render(h.request, uiSettings, {
      includeUserSettings: true,
      vars
    });
    return h.response(content).type('text/html').header('content-security-policy', http.csp.header);
  }

  server.decorate('toolkit', 'renderApp', function () {
    return renderApp(this);
  });
}