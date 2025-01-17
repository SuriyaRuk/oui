"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCoreUsageCollector = getCoreUsageCollector;
exports.registerCoreUsageCollector = registerCoreUsageCollector;

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
function getCoreUsageCollector(usageCollection, getCoreUsageDataService) {
  return usageCollection.makeUsageCollector({
    type: 'core',
    isReady: () => typeof getCoreUsageDataService() !== 'undefined',
    schema: {
      config: {
        opensearch: {
          sniffOnStart: {
            type: 'boolean'
          },
          sniffIntervalMs: {
            type: 'long'
          },
          sniffOnConnectionFault: {
            type: 'boolean'
          },
          numberOfHostsConfigured: {
            type: 'long'
          },
          requestHeadersWhitelistConfigured: {
            type: 'boolean'
          },
          customHeadersConfigured: {
            type: 'boolean'
          },
          shardTimeoutMs: {
            type: 'long'
          },
          requestTimeoutMs: {
            type: 'long'
          },
          pingTimeoutMs: {
            type: 'long'
          },
          logQueries: {
            type: 'boolean'
          },
          ssl: {
            verificationMode: {
              type: 'keyword'
            },
            certificateAuthoritiesConfigured: {
              type: 'boolean'
            },
            certificateConfigured: {
              type: 'boolean'
            },
            keyConfigured: {
              type: 'boolean'
            },
            keystoreConfigured: {
              type: 'boolean'
            },
            truststoreConfigured: {
              type: 'boolean'
            },
            alwaysPresentCertificate: {
              type: 'boolean'
            }
          },
          apiVersion: {
            type: 'keyword'
          },
          healthCheckDelayMs: {
            type: 'long'
          }
        },
        http: {
          basePathConfigured: {
            type: 'boolean'
          },
          maxPayloadInBytes: {
            type: 'long'
          },
          rewriteBasePath: {
            type: 'boolean'
          },
          keepaliveTimeout: {
            type: 'long'
          },
          socketTimeout: {
            type: 'long'
          },
          compression: {
            enabled: {
              type: 'boolean'
            },
            referrerWhitelistConfigured: {
              type: 'boolean'
            }
          },
          xsrf: {
            disableProtection: {
              type: 'boolean'
            },
            whitelistConfigured: {
              type: 'boolean'
            }
          },
          requestId: {
            allowFromAnyIp: {
              type: 'boolean'
            },
            ipAllowlistConfigured: {
              type: 'boolean'
            }
          },
          ssl: {
            certificateAuthoritiesConfigured: {
              type: 'boolean'
            },
            certificateConfigured: {
              type: 'boolean'
            },
            cipherSuites: {
              type: 'array',
              items: {
                type: 'keyword'
              }
            },
            keyConfigured: {
              type: 'boolean'
            },
            keystoreConfigured: {
              type: 'boolean'
            },
            truststoreConfigured: {
              type: 'boolean'
            },
            redirectHttpFromPortConfigured: {
              type: 'boolean'
            },
            supportedProtocols: {
              type: 'array',
              items: {
                type: 'keyword'
              }
            },
            clientAuthentication: {
              type: 'keyword'
            }
          }
        },
        logging: {
          appendersTypesUsed: {
            type: 'array',
            items: {
              type: 'keyword'
            }
          },
          loggersConfiguredCount: {
            type: 'long'
          }
        },
        savedObjects: {
          maxImportPayloadBytes: {
            type: 'long'
          },
          maxImportExportSizeBytes: {
            type: 'long'
          }
        }
      },
      environment: {
        memory: {
          heapSizeLimit: {
            type: 'long'
          },
          heapTotalBytes: {
            type: 'long'
          },
          heapUsedBytes: {
            type: 'long'
          }
        }
      },
      services: {
        savedObjects: {
          indices: {
            type: 'array',
            items: {
              docsCount: {
                type: 'long'
              },
              docsDeleted: {
                type: 'long'
              },
              alias: {
                type: 'text'
              },
              primaryStoreSizeBytes: {
                type: 'long'
              },
              storeSizeBytes: {
                type: 'long'
              }
            }
          }
        }
      }
    },

    fetch() {
      return getCoreUsageDataService().getCoreUsageData();
    }

  });
}

function registerCoreUsageCollector(usageCollection, getCoreUsageDataService) {
  usageCollection.registerCollector(getCoreUsageCollector(usageCollection, getCoreUsageDataService));
}