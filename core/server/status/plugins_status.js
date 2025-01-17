"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginsStatusService = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _util = require("util");

var _get_summary_status = require("./get_summary_status");

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

class PluginsStatusService {
  constructor(deps) {
    this.deps = deps;

    _defineProperty(this, "pluginStatuses", new Map());

    _defineProperty(this, "update$", new _rxjs.BehaviorSubject(true));

    _defineProperty(this, "defaultInheritedStatus$", void 0);

    this.defaultInheritedStatus$ = this.deps.core$.pipe((0, _operators.map)(coreStatus => {
      return (0, _get_summary_status.getSummaryStatus)(Object.entries(coreStatus), {
        allAvailableSummary: `All dependencies are available`
      });
    }));
  }

  set(plugin, status$) {
    this.pluginStatuses.set(plugin, status$);
    this.update$.next(true); // trigger all existing Observables to update from the new source Observable
  }

  getAll$() {
    return this.getPluginStatuses$([...this.deps.pluginDependencies.keys()]);
  }

  getDependenciesStatus$(plugin) {
    const dependencies = this.deps.pluginDependencies.get(plugin);

    if (!dependencies) {
      throw new Error(`Unknown plugin: ${plugin}`);
    }

    return this.getPluginStatuses$(dependencies).pipe( // Prevent many emissions at once from dependency status resolution from making this too noisy
    (0, _operators.debounceTime)(500));
  }

  getDerivedStatus$(plugin) {
    return this.update$.pipe((0, _operators.switchMap)(() => {
      // Only go up the dependency tree if any of this plugin's dependencies have a custom status
      // Helps eliminate memory overhead of creating thousands of Observables unnecessarily.
      if (this.anyCustomStatuses(plugin)) {
        return (0, _rxjs.combineLatest)([this.deps.core$, this.getDependenciesStatus$(plugin)]).pipe((0, _operators.map)(([coreStatus, pluginStatuses]) => {
          return (0, _get_summary_status.getSummaryStatus)([...Object.entries(coreStatus), ...Object.entries(pluginStatuses)], {
            allAvailableSummary: `All dependencies are available`
          });
        }));
      } else {
        return this.defaultInheritedStatus$;
      }
    }));
  }

  getPluginStatuses$(plugins) {
    if (plugins.length === 0) {
      return (0, _rxjs.of)({});
    }

    return this.update$.pipe((0, _operators.switchMap)(() => {
      const pluginStatuses = plugins.map(depName => {
        var _this$pluginStatuses$;

        return [depName, (_this$pluginStatuses$ = this.pluginStatuses.get(depName)) !== null && _this$pluginStatuses$ !== void 0 ? _this$pluginStatuses$ : this.getDerivedStatus$(depName)];
      }).map(([pName, status$]) => status$.pipe((0, _operators.map)(status => [pName, status])));
      return (0, _rxjs.combineLatest)(pluginStatuses).pipe((0, _operators.map)(statuses => Object.fromEntries(statuses)), (0, _operators.distinctUntilChanged)(_util.isDeepStrictEqual));
    }));
  }
  /**
   * Determines whether or not this plugin or any plugin in it's dependency tree have a custom status registered.
   */


  anyCustomStatuses(plugin) {
    if (this.pluginStatuses.get(plugin)) {
      return true;
    }

    return this.deps.pluginDependencies.get(plugin).reduce((acc, depName) => acc || this.anyCustomStatuses(depName), false);
  }

}

exports.PluginsStatusService = PluginsStatusService;