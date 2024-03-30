"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClauseForReference = getClauseForReference;
exports.getQueryParams = getQueryParams;

var _opensearch_query = require("../../../opensearch_query");

var _utils = require("../utils");

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
// @ts-expect-error no ts

/**
 * Gets the types based on the type. Uses mappings to support
 * null type (all types), a single type string or an array
 */
function getTypes(registry, type) {
  if (!type) {
    return registry.getAllTypes().map(registeredType => registeredType.name);
  }

  return Array.isArray(type) ? type : [type];
}
/**
 *  Get the field params based on the types, searchFields, and rootSearchFields
 */


function getSimpleQueryStringTypeFields(types, searchFields = [], rootSearchFields = []) {
  if (!searchFields.length && !rootSearchFields.length) {
    return {
      lenient: true,
      fields: ['*']
    };
  }

  let fields = [...rootSearchFields];
  fields.forEach(field => {
    if (field.indexOf('.') !== -1) {
      throw new Error(`rootSearchFields entry "${field}" is invalid: cannot contain "." character`);
    }
  });

  for (const field of searchFields) {
    fields = fields.concat(types.map(prefix => `${prefix}.${field}`));
  }

  return {
    fields
  };
}
/**
 *  Gets the clause that will filter for the type in the namespace.
 *  Some types are namespace agnostic, so they must be treated differently.
 */


function getClauseForType(registry, namespaces = [_utils.DEFAULT_NAMESPACE_STRING], type) {
  if (namespaces.length === 0) {
    throw new Error('cannot specify empty namespaces array');
  }

  if (registry.isMultiNamespace(type)) {
    return {
      bool: {
        must: [{
          term: {
            type
          }
        }, {
          terms: {
            namespaces: [...namespaces, _utils.ALL_NAMESPACES_STRING]
          }
        }],
        must_not: [{
          exists: {
            field: 'namespace'
          }
        }]
      }
    };
  } else if (registry.isSingleNamespace(type)) {
    const should = [];
    const eligibleNamespaces = namespaces.filter(x => x !== _utils.DEFAULT_NAMESPACE_STRING);

    if (eligibleNamespaces.length > 0) {
      should.push({
        terms: {
          namespace: eligibleNamespaces
        }
      });
    }

    if (namespaces.includes(_utils.DEFAULT_NAMESPACE_STRING)) {
      should.push({
        bool: {
          must_not: [{
            exists: {
              field: 'namespace'
            }
          }]
        }
      });
    }

    if (should.length === 0) {
      // This is indicitive of a bug, and not user error.
      throw new Error('unhandled search condition: expected at least 1 `should` clause.');
    }

    return {
      bool: {
        must: [{
          term: {
            type
          }
        }],
        should,
        minimum_should_match: 1,
        must_not: [{
          exists: {
            field: 'namespaces'
          }
        }]
      }
    };
  } // isNamespaceAgnostic


  return {
    bool: {
      must: [{
        term: {
          type
        }
      }],
      must_not: [{
        exists: {
          field: 'namespace'
        }
      }, {
        exists: {
          field: 'namespaces'
        }
      }]
    }
  };
}

function getClauseForReference(reference) {
  return {
    nested: {
      path: 'references',
      query: {
        bool: {
          must: [{
            term: {
              'references.id': reference.id
            }
          }, {
            term: {
              'references.type': reference.type
            }
          }]
        }
      }
    }
  };
} // A de-duplicated set of namespaces makes for a more efficient query.
//
// Additionally, we treat the `*` namespace as the `default` namespace.
// In the Default Distribution, the `*` is automatically expanded to include all available namespaces.
// However, the distribution (and certain configurations of the Default Distribution) can allow the `*`
// to pass through to the SO Repository, and eventually to this module. When this happens, we translate to `default`,
// since that is consistent with how a single-namespace search behaves in the distribution. Leaving the wildcard in place
// would result in no results being returned, as the wildcard is treated as a literal, and not _actually_ as a wildcard.
// We had a good discussion around the tradeoffs here: https://github.com/elastic/kibana/pull/67644#discussion_r441055716


const normalizeNamespaces = namespacesToNormalize => namespacesToNormalize ? Array.from(new Set(namespacesToNormalize.map(x => x === '*' ? _utils.DEFAULT_NAMESPACE_STRING : x))) : undefined;
/**
 *  Get the "query" related keys for the search body
 */


function getQueryParams({
  registry,
  namespaces,
  type,
  typeToNamespacesMap,
  search,
  searchFields,
  rootSearchFields,
  defaultSearchOperator,
  hasReference,
  kueryNode
}) {
  const types = getTypes(registry, typeToNamespacesMap ? Array.from(typeToNamespacesMap.keys()) : type);
  const bool = {
    filter: [...(kueryNode != null ? [_opensearch_query.opensearchKuery.toOpenSearchQuery(kueryNode)] : []), {
      bool: {
        must: hasReference ? [getClauseForReference(hasReference)] : undefined,
        should: types.map(shouldType => {
          const normalizedNamespaces = normalizeNamespaces(typeToNamespacesMap ? typeToNamespacesMap.get(shouldType) : namespaces);
          return getClauseForType(registry, normalizedNamespaces, shouldType);
        }),
        minimum_should_match: 1
      }
    }]
  };

  if (search) {
    const useMatchPhrasePrefix = shouldUseMatchPhrasePrefix(search);
    const simpleQueryStringClause = getSimpleQueryStringClause({
      search,
      types,
      searchFields,
      rootSearchFields,
      defaultSearchOperator
    });

    if (useMatchPhrasePrefix) {
      bool.should = [simpleQueryStringClause, ...getMatchPhrasePrefixClauses({
        search,
        searchFields,
        types,
        registry
      })];
      bool.minimum_should_match = 1;
    } else {
      bool.must = [simpleQueryStringClause];
    }
  }

  return {
    query: {
      bool
    }
  };
} // we only want to add match_phrase_prefix clauses
// if the search is a prefix search


const shouldUseMatchPhrasePrefix = search => {
  return search.trim().endsWith('*');
};

const getMatchPhrasePrefixClauses = ({
  search,
  searchFields,
  registry,
  types
}) => {
  // need to remove the prefix search operator
  const query = search.replace(/[*]$/, '');
  const mppFields = getMatchPhrasePrefixFields({
    searchFields,
    types,
    registry
  });
  return mppFields.map(({
    field,
    boost
  }) => {
    return {
      match_phrase_prefix: {
        [field]: {
          query,
          boost
        }
      }
    };
  });
};

const getMatchPhrasePrefixFields = ({
  searchFields = [],
  types,
  registry
}) => {
  const output = [];
  searchFields = searchFields.filter(field => field !== '*');
  let fields;

  if (searchFields.length === 0) {
    fields = types.reduce((typeFields, type) => {
      var _registry$getType, _registry$getType$man;

      const defaultSearchField = (_registry$getType = registry.getType(type)) === null || _registry$getType === void 0 ? void 0 : (_registry$getType$man = _registry$getType.management) === null || _registry$getType$man === void 0 ? void 0 : _registry$getType$man.defaultSearchField;

      if (defaultSearchField) {
        return [...typeFields, `${type}.${defaultSearchField}`];
      }

      return typeFields;
    }, []);
  } else {
    fields = [];

    for (const field of searchFields) {
      fields = fields.concat(types.map(type => `${type}.${field}`));
    }
  }

  fields.forEach(rawField => {
    const [field, rawBoost] = rawField.split('^');
    let boost = 1;

    if (rawBoost) {
      try {
        boost = parseInt(rawBoost, 10);
      } catch (e) {
        boost = 1;
      }
    }

    if (isNaN(boost)) {
      boost = 1;
    }

    output.push({
      field,
      boost
    });
  });
  return output;
};

const getSimpleQueryStringClause = ({
  search,
  types,
  searchFields,
  rootSearchFields,
  defaultSearchOperator
}) => {
  return {
    simple_query_string: {
      query: search,
      ...getSimpleQueryStringTypeFields(types, searchFields, rootSearchFields),
      ...(defaultSearchOperator ? {
        default_operator: defaultSearchOperator
      } : {})
    }
  };
};