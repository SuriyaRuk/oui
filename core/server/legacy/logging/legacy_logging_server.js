"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LegacyLoggingServer = void 0;
exports.attachMetaData = attachMetaData;
exports.metadataSymbol = void 0;

var _podium = _interopRequireDefault(require("@hapi/podium"));

var _config = require("../../../../legacy/server/config");

var _logging = require("../../../../legacy/server/logging");

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
                                                                                                                                                                                                                       */ // @ts-expect-error: implicit any for JS file
// @ts-expect-error: implicit any for JS file


const metadataSymbol = Symbol('log message with metadata');
exports.metadataSymbol = metadataSymbol;

function attachMetaData(message, metadata = {}) {
  return {
    [metadataSymbol]: {
      message,
      metadata
    }
  };
}

const isEmptyObject = obj => Object.keys(obj).length === 0;

function getDataToLog(error, metadata, message) {
  if (error) return error;
  if (!isEmptyObject(metadata)) return attachMetaData(message, metadata);
  return message;
}

/**
 * Converts core log level to a one that's known to the legacy platform.
 * @param level Log level from the core.
 */
function getLegacyLogLevel(level) {
  const logLevel = level.id.toLowerCase();

  if (logLevel === 'warn') {
    return 'warning';
  }

  if (logLevel === 'trace') {
    return 'debug';
  }

  return logLevel;
}
/**
 *  The "legacy" OpenSearch Dashboards uses Hapi server + even-better plugin to log, so we should
 *  use the same approach here to make log records generated by the core to look the
 *  same as the rest of the records generated by the "legacy" OpenSearch Dashboards. But to reduce
 *  overhead of having full blown Hapi server instance we create our own "light" version.
 *  @internal
 */


class LegacyLoggingServer {
  // Emulates Hapi's usage of the podium event bus.
  constructor(legacyLoggingConfig) {
    _defineProperty(this, "connections", []);

    _defineProperty(this, "events", new _podium.default(['log', 'request', 'response']));

    _defineProperty(this, "onPostStopCallback", void 0);

    // We set `ops.interval` to max allowed number and `ops` filter to value
    // that doesn't exist to avoid logging of ops at all, if turned on it will be
    // logged by the "legacy" OpenSearch Dashboards.
    const config = {
      logging: { ...legacyLoggingConfig,
        events: { ...legacyLoggingConfig.events,
          ops: '__no-ops__'
        }
      },
      ops: {
        interval: 2147483647
      }
    };
    (0, _logging.setupLogging)(this, _config.Config.withDefaultSchema(config));
  }

  register({
    plugin: {
      register
    },
    options
  }) {
    return register(this, options);
  }

  log({
    level,
    context,
    message,
    error,
    timestamp,
    meta = {}
  }) {
    const {
      tags = [],
      ...metadata
    } = meta;
    this.events.emit('log', {
      data: getDataToLog(error, metadata, message),
      tags: [getLegacyLogLevel(level), ...context.split('.'), ...tags],
      timestamp: timestamp.getTime()
    });
  }

  stop() {
    // Tell the plugin we're stopping.
    if (this.onPostStopCallback !== undefined) {
      this.onPostStopCallback();
    }
  }

  ext(eventName, callback) {
    // method is called by plugin that's being registered.
    if (eventName === 'onPostStop') {
      this.onPostStopCallback = callback;
    } // We don't care about any others the plugin registers

  }

  expose() {// method is called by plugin that's being registered.
  }

}

exports.LegacyLoggingServer = LegacyLoggingServer;