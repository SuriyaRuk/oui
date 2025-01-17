"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.addCli = addCli;

var _logger = require("../cli_plugin/lib/logger");

var _utils = require("./utils");

var _utils2 = require("../core/server/utils");

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
 * @param {Keystore} keystore
 * @param {String} key
 * @param {Object|null} options
 * @property {Boolean} options.force - if true, will overwrite without prompting
 * @property {Stream} options.stdinStream - defaults to process.stdin
 * @property {Boolean} options.stdin - if true, uses options.stdin to read value
 */
async function add(keystore, key, options = {}) {
  var _parsedJsonValue;

  const logger = new _logger.Logger(options);
  let value;

  if (!keystore.exists()) {
    return logger.error("ERROR: OpenSearch Dashboards keystore not found. Use 'create' command to create one.");
  }

  if (!options.force && keystore.has(key)) {
    if (options.stdin) {
      return logger.log(`Setting ${key} already exists, exiting without modifying keystore.`);
    } else {
      const overwrite = await (0, _utils.confirm)(`Setting ${key} already exists. Overwrite?`);

      if (!overwrite) {
        return logger.log('Exiting without modifying keystore.');
      }
    }
  }

  if (options.stdin) {
    value = await (0, _utils2.createPromiseFromStreams)([options.stdinStream || process.stdin, (0, _utils2.createConcatStream)('')]);
  } else {
    value = await (0, _utils.question)(`Enter value for ${key}`, {
      mask: '*'
    });
  }

  const parsedValue = value.trim();
  let parsedJsonValue;

  try {
    parsedJsonValue = JSON.parse(parsedValue);
  } catch {// noop, only treat value as json if it parses as JSON
  }

  keystore.add(key, (_parsedJsonValue = parsedJsonValue) !== null && _parsedJsonValue !== void 0 ? _parsedJsonValue : parsedValue);
  keystore.save();
}

function addCli(program, keystore) {
  program.command('add <key>').description('Add a string setting to the keystore').option('-f, --force', 'overwrite existing setting without prompting').option('-x, --stdin', 'read setting value from stdin').option('-s, --silent', 'prevent all logging').action(add.bind(null, keystore));
}