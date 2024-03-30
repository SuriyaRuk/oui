"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TutorialsRegistry = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _tutorial_schema = require("./lib/tutorial_schema");

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

class TutorialsRegistry {
  constructor() {
    _defineProperty(this, "tutorialProviders", []);

    _defineProperty(this, "scopedTutorialContextFactories", []);
  } // pre-register all the tutorials we know we want in here


  setup(core) {
    const router = core.http.createRouter();
    router.get({
      path: '/api/opensearch-dashboards/home/tutorials',
      validate: false
    }, async (context, req, res) => {
      const initialContext = {};
      const scopedContext = this.scopedTutorialContextFactories.reduce((accumulatedContext, contextFactory) => {
        return { ...accumulatedContext,
          ...contextFactory(req)
        };
      }, initialContext);
      return res.ok({
        body: this.tutorialProviders.map(tutorialProvider => {
          return tutorialProvider(scopedContext); // All the tutorialProviders need to be refactored so that they don't need the server.
        })
      });
    });
    return {
      registerTutorial: specProvider => {
        const emptyContext = {};

        const {
          error
        } = _joi.default.validate(specProvider(emptyContext), _tutorial_schema.tutorialSchema);

        if (error) {
          throw new Error(`Unable to register tutorial spec because its invalid. ${error}`);
        }

        this.tutorialProviders.push(specProvider);
      },
      unregisterTutorial: specProvider => {
        this.tutorialProviders = this.tutorialProviders.filter(provider => provider !== specProvider);
      },
      addScopedTutorialContextFactory: scopedTutorialContextFactory => {
        if (typeof scopedTutorialContextFactory !== 'function') {
          throw new Error(`Unable to add scoped(request) context factory because you did not provide a function`);
        }

        this.scopedTutorialContextFactories.push(scopedTutorialContextFactory);
      }
    };
  }

  start() {
    // pre-populate with built in tutorials
    // TODO: [RENAMEME] Need prod urls.
    // https://github.com/opensearch-project/OpenSearch-Dashboards/issues/335
    // this.tutorialProviders.push(...builtInTutorials);
    return {};
  }

}
/** @public */

/** @public */


exports.TutorialsRegistry = TutorialsRegistry;