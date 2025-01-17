"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractReferences = void 0;

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
const extractReferences = state => {
  let searchSourceFields = { ...state
  };
  const references = [];

  if (searchSourceFields.index) {
    const indexId = searchSourceFields.index.id || searchSourceFields.index;
    const refName = 'kibanaSavedObjectMeta.searchSourceJSON.index';
    references.push({
      name: refName,
      type: 'index-pattern',
      id: indexId
    });
    searchSourceFields = { ...searchSourceFields,
      indexRefName: refName,
      index: undefined
    };
  }

  if (searchSourceFields.filter) {
    searchSourceFields = { ...searchSourceFields,
      filter: searchSourceFields.filter.map((filterRow, i) => {
        if (!filterRow.meta || !filterRow.meta.index) {
          return filterRow;
        }

        const refName = `kibanaSavedObjectMeta.searchSourceJSON.filter[${i}].meta.index`;
        references.push({
          name: refName,
          type: 'index-pattern',
          id: filterRow.meta.index
        });
        return { ...filterRow,
          meta: { ...filterRow.meta,
            indexRefName: refName,
            index: undefined
          }
        };
      })
    };
  }

  return [searchSourceFields, references];
};

exports.extractReferences = extractReferences;