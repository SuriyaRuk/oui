"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginsSystem = void 0;

var _std = require("@osd/std");

var _semver = _interopRequireDefault(require("semver"));

var _plugin_context = require("./plugin_context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /*
                                                                                                                                                                                                                   * SPDX-License-Identifier: Apache-2.0
                                                                                                                                                                                                                   *
                                                                                                                                                                                                                   * The OpenSearch Contributors require contributions made to
                                                                                                                                                                                                                   * this file be licensed under the Apache-2.0 license or a
                                                                                                                                                                                                                   * compatible open source license.
                                                                                                                                                                                                                   *
                                                                                                                                                                                                                   * Any modifications Copyright OpenSearch Contributors. See
                                                                                                                                                                                                                   * GitHub history for details.
                                                                                                                                                                                                                   */ /*
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

const Sec = 1000;
/** @internal */

class PluginsSystem {
  // `satup`, the past-tense version of the noun `setup`.
  constructor(coreContext) {
    this.coreContext = coreContext;

    _defineProperty(this, "plugins", new Map());

    _defineProperty(this, "log", void 0);

    _defineProperty(this, "satupPlugins", []);

    this.log = coreContext.logger.get('plugins-system');
  }

  addPlugin(plugin) {
    this.plugins.set(plugin.name, plugin);
  }
  /**
   * @returns a ReadonlyMap of each plugin and an Array of its available dependencies
   * @internal
   */


  getPluginDependencies() {
    const asNames = new Map([...this.plugins].map(([name, plugin]) => [plugin.name, [...new Set([...plugin.requiredPlugins, ...plugin.optionalPlugins.filter(optPlugin => this.plugins.has(optPlugin))])].map(depId => this.plugins.get(depId).name)]));
    const asOpaqueIds = new Map([...this.plugins].map(([name, plugin]) => [plugin.opaqueId, [...new Set([...plugin.requiredPlugins, ...plugin.optionalPlugins.filter(optPlugin => this.plugins.has(optPlugin))])].map(depId => this.plugins.get(depId).opaqueId)]));
    return {
      asNames,
      asOpaqueIds
    };
  }

  async setupPlugins(deps) {
    const contracts = new Map();

    if (this.plugins.size === 0) {
      return contracts;
    }

    const sortedPlugins = new Map([...this.getTopologicallySortedPluginNames()].map(pluginName => [pluginName, this.plugins.get(pluginName)]).filter(([pluginName, plugin]) => plugin.includesServerPlugin));
    this.log.info(`Setting up [${sortedPlugins.size}] plugins: [${[...sortedPlugins.keys()].join(',')}]`);

    for (const [pluginName, plugin] of sortedPlugins) {
      this.log.debug(`Setting up plugin "${pluginName}"...`);
      const pluginDeps = new Set([...plugin.requiredPlugins, ...plugin.optionalPlugins]);
      const pluginDepContracts = Array.from(pluginDeps).reduce((depContracts, dependencyName) => {
        // Only set if present. Could be absent if plugin does not have server-side code or is a
        // missing optional dependency.
        if (contracts.has(dependencyName)) {
          depContracts[dependencyName] = contracts.get(dependencyName);
        }

        return depContracts;
      }, {});
      const contract = await (0, _std.withTimeout)({
        promise: plugin.setup((0, _plugin_context.createPluginSetupContext)(this.coreContext, deps, plugin), pluginDepContracts),
        timeout: 30 * Sec,
        errorMessage: `Setup lifecycle of "${pluginName}" plugin wasn't completed in 30sec. Consider disabling the plugin and re-start.`
      });
      contracts.set(pluginName, contract);
      this.satupPlugins.push(pluginName);
    }

    return contracts;
  }

  async startPlugins(deps) {
    const contracts = new Map();

    if (this.satupPlugins.length === 0) {
      return contracts;
    }

    this.log.info(`Starting [${this.satupPlugins.length}] plugins: [${[...this.satupPlugins]}]`);

    for (const pluginName of this.satupPlugins) {
      this.log.debug(`Starting plugin "${pluginName}"...`);
      const plugin = this.plugins.get(pluginName);
      const pluginDeps = new Set([...plugin.requiredPlugins, ...plugin.optionalPlugins]);
      const pluginDepContracts = Array.from(pluginDeps).reduce((depContracts, dependencyName) => {
        // Only set if present. Could be absent if plugin does not have server-side code or is a
        // missing optional dependency.
        if (contracts.has(dependencyName)) {
          depContracts[dependencyName] = contracts.get(dependencyName);
        }

        return depContracts;
      }, {});
      const contract = await (0, _std.withTimeout)({
        promise: plugin.start((0, _plugin_context.createPluginStartContext)(this.coreContext, deps, plugin), pluginDepContracts),
        timeout: 30 * Sec,
        errorMessage: `Start lifecycle of "${pluginName}" plugin wasn't completed in 30sec. Consider disabling the plugin and re-start.`
      });
      contracts.set(pluginName, contract);
    }

    await this.healthCheckOpenSearchPlugins(deps);
    return contracts;
  }

  async healthCheckOpenSearchPlugins(deps) {
    // make _cat/plugins?format=json call to the OpenSearch instance
    const opensearchInstalledPlugins = await this.getOpenSearchPlugins(deps);

    for (const pluginName of this.satupPlugins) {
      this.log.debug(`For plugin "${pluginName}"...`);
      const plugin = this.plugins.get(pluginName);
      const pluginOpenSearchDeps = Object.entries(plugin.requiredEnginePlugins);

      for (const [enginePluginName, versionRange] of pluginOpenSearchDeps) {
        // add check to see if the installing Dashboards plugin version is compatible with installed OpenSearch plugin
        if (!this.isVersionCompatibleOSPluginInstalled(opensearchInstalledPlugins, enginePluginName, versionRange)) {
          this.log.warn(`OpenSearch plugin "${enginePluginName}" is not installed on the engine for the OpenSearch Dashboards plugin to function as expected.`);
        }
      }
    }
  }

  isVersionCompatibleOSPluginInstalled(opensearchInstalledPlugins, depPlugin, versionRange) {
    return opensearchInstalledPlugins.find(obj => obj.component === depPlugin && _semver.default.satisfies(_semver.default.coerce(obj.version).version, versionRange));
  }

  async getOpenSearchPlugins(deps) {
    // Makes cat.plugin api call to fetch list of OpenSearch plugins installed on the cluster
    try {
      const {
        body
      } = await deps.opensearch.client.asInternalUser.cat.plugins({
        format: 'JSON'
      });
      return body;
    } catch (error) {
      this.log.warn(`Cat API call to OpenSearch to get list of plugins installed on the cluster has failed: ${error}`);
      return [];
    }
  }

  async stopPlugins() {
    if (this.plugins.size === 0 || this.satupPlugins.length === 0) {
      return;
    }

    this.log.info(`Stopping all plugins.`); // Stop plugins in the reverse order of when they were set up.

    while (this.satupPlugins.length > 0) {
      const pluginName = this.satupPlugins.pop();
      this.log.debug(`Stopping plugin "${pluginName}"...`);
      await this.plugins.get(pluginName).stop();
    }
  }
  /**
   * Get a Map of all discovered UI plugins in topological order.
   */


  uiPlugins() {
    const uiPluginNames = [...this.getTopologicallySortedPluginNames().keys()].filter(pluginName => this.plugins.get(pluginName).includesUiPlugin);
    const publicPlugins = new Map(uiPluginNames.map(pluginName => {
      const plugin = this.plugins.get(pluginName);
      return [pluginName, {
        id: pluginName,
        configPath: plugin.manifest.configPath,
        requiredPlugins: plugin.manifest.requiredPlugins.filter(p => uiPluginNames.includes(p)),
        optionalPlugins: plugin.manifest.optionalPlugins.filter(p => uiPluginNames.includes(p)),
        requiredBundles: plugin.manifest.requiredBundles
      }];
    }));
    return publicPlugins;
  }
  /**
   * Gets topologically sorted plugin names that are registered with the plugin system.
   * Ordering is possible if and only if the plugins graph has no directed cycles,
   * that is, if it is a directed acyclic graph (DAG). If plugins cannot be ordered
   * an error is thrown.
   *
   * Uses Kahn's Algorithm to sort the graph.
   */


  getTopologicallySortedPluginNames() {
    // We clone plugins so we can remove handled nodes while we perform the
    // topological ordering. If the cloned graph is _not_ empty at the end, we
    // know we were not able to topologically order the graph. We exclude optional
    // dependencies that are not present in the plugins graph.
    const pluginsDependenciesGraph = new Map([...this.plugins.entries()].map(([pluginName, plugin]) => {
      return [pluginName, new Set([...plugin.requiredPlugins, ...plugin.optionalPlugins.filter(dependency => this.plugins.has(dependency))])];
    })); // First, find a list of "start nodes" which have no outgoing edges. At least
    // one such node must exist in a non-empty acyclic graph.

    const pluginsWithAllDependenciesSorted = [...pluginsDependenciesGraph.keys()].filter(pluginName => pluginsDependenciesGraph.get(pluginName).size === 0);
    const sortedPluginNames = new Set();

    while (pluginsWithAllDependenciesSorted.length > 0) {
      const sortedPluginName = pluginsWithAllDependenciesSorted.pop(); // We know this plugin has all its dependencies sorted, so we can remove it
      // and include into the final result.

      pluginsDependenciesGraph.delete(sortedPluginName);
      sortedPluginNames.add(sortedPluginName); // Go through the rest of the plugins and remove `sortedPluginName` from their
      // unsorted dependencies.

      for (const [pluginName, dependencies] of pluginsDependenciesGraph) {
        // If we managed delete `sortedPluginName` from dependencies let's check
        // whether it was the last one and we can mark plugin as sorted.
        if (dependencies.delete(sortedPluginName) && dependencies.size === 0) {
          pluginsWithAllDependenciesSorted.push(pluginName);
        }
      }
    }

    if (pluginsDependenciesGraph.size > 0) {
      const edgesLeft = JSON.stringify([...pluginsDependenciesGraph.keys()]);
      throw new Error(`Topological ordering of plugins did not complete, these plugins have cyclic or missing dependencies: ${edgesLeft}`);
    }

    return sortedPluginNames;
  }

}

exports.PluginsSystem = PluginsSystem;