"use strict";

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("../core/server/utils");

var _command = _interopRequireDefault(require("./command"));

var _serve = _interopRequireDefault(require("./serve/serve"));

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
const argv = process.env.osdWorkerArgv ? JSON.parse(process.env.osdWorkerArgv) : process.argv.slice();
const program = new _command.default('bin/opensearch-dashboards');
program.version(_utils.pkg.version).description('OpenSearch Dashboards is an open source (Apache Licensed), browser ' + 'based analytics and search dashboard for OpenSearch.'); // attach commands

(0, _serve.default)(program);
program.command('help <command>').description('Get the help for a specific command').action(function (cmdName) {
  const cmd = _lodash.default.find(program.commands, {
    _name: cmdName
  });

  if (!cmd) return program.error(`unknown command ${cmdName}`);
  cmd.help();
});
program.command('*', null, {
  noHelp: true
}).action(function (cmd) {
  program.error(`unknown command ${cmd}`);
}); // check for no command name

const subCommand = argv[2] && !String(argv[2][0]).match(/^-|^\.|\//);

if (!subCommand) {
  if (_lodash.default.intersection(argv.slice(2), ['-h', '--help']).length) {
    program.defaultHelp();
  } else {
    argv.splice(2, 0, ['serve']);
  }
}

program.parse(argv);