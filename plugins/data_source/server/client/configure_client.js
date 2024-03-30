"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureClient = void 0;

var _opensearchNext = require("@opensearch-project/opensearch-next");

var _awsSdk = require("aws-sdk");

var _aws = require("@opensearch-project/opensearch-next/aws");

var _data_sources = require("../../common/data_sources");

var _error = require("../lib/error");

var _client_config = require("./client_config");

var _configure_client_utils = require("./configure_client_utils");

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
const configureClient = async ({
  dataSourceId,
  savedObjects,
  cryptography,
  testClientDataSourceAttr
}, openSearchClientPoolSetup, config, logger) => {
  let dataSource;
  let requireDecryption = true;

  try {
    // configure test client
    if (testClientDataSourceAttr) {
      const {
        auth: {
          type,
          credentials
        }
      } = testClientDataSourceAttr; // handle test connection case when changing non-credential field of existing data source

      if (dataSourceId && (type === _data_sources.AuthType.UsernamePasswordType && !(credentials !== null && credentials !== void 0 && credentials.password) || type === _data_sources.AuthType.SigV4 && !(credentials !== null && credentials !== void 0 && credentials.accessKey) && !(credentials !== null && credentials !== void 0 && credentials.secretKey))) {
        dataSource = await (0, _configure_client_utils.getDataSource)(dataSourceId, savedObjects);
      } else {
        dataSource = testClientDataSourceAttr;
        requireDecryption = false;
      }
    } else {
      dataSource = await (0, _configure_client_utils.getDataSource)(dataSourceId, savedObjects);
    }

    const rootClient = (0, _configure_client_utils.getRootClient)(dataSource, openSearchClientPoolSetup.getClientFromPool, dataSourceId);
    return await getQueryClient(dataSource, openSearchClientPoolSetup.addClientToPool, config, cryptography, rootClient, dataSourceId, requireDecryption);
  } catch (error) {
    logger.debug(`Failed to get data source client for dataSourceId: [${dataSourceId}]. ${error}: ${error.stack}`); // Re-throw as DataSourceError

    throw (0, _error.createDataSourceError)(error);
  }
};
/**
 * Create a child client object with given auth info.
 *
 * @param rootClient root client for the given data source.
 * @param dataSourceAttr data source saved object attributes
 * @param cryptography cryptography service for password encryption / decryption
 * @param config data source config
 * @param addClientToPool function to add client to client pool
 * @param dataSourceId id of data source saved Object
 * @param requireDecryption false when creating test client before data source exists
 * @returns Promise of query client
 */


exports.configureClient = configureClient;

const getQueryClient = async (dataSourceAttr, addClientToPool, config, cryptography, rootClient, dataSourceId, requireDecryption = true) => {
  const {
    auth: {
      type
    },
    endpoint
  } = dataSourceAttr;
  const clientOptions = (0, _client_config.parseClientOptions)(config, endpoint);
  const cacheKey = (0, _configure_client_utils.generateCacheKey)(dataSourceAttr, dataSourceId);

  switch (type) {
    case _data_sources.AuthType.NoAuth:
      if (!rootClient) rootClient = new _opensearchNext.Client(clientOptions);
      addClientToPool(cacheKey, type, rootClient);
      return rootClient.child();

    case _data_sources.AuthType.UsernamePasswordType:
      const credential = requireDecryption ? await (0, _configure_client_utils.getCredential)(dataSourceAttr, cryptography) : dataSourceAttr.auth.credentials;
      if (!rootClient) rootClient = new _opensearchNext.Client(clientOptions);
      addClientToPool(cacheKey, type, rootClient);
      return getBasicAuthClient(rootClient, credential);

    case _data_sources.AuthType.SigV4:
      const awsCredential = requireDecryption ? await (0, _configure_client_utils.getAWSCredential)(dataSourceAttr, cryptography) : dataSourceAttr.auth.credentials;
      const awsClient = rootClient ? rootClient : getAWSClient(awsCredential, clientOptions);
      addClientToPool(cacheKey, type, awsClient);
      return awsClient;

    default:
      throw Error(`${type} is not a supported auth type for data source`);
  }
};

const getBasicAuthClient = (rootClient, credential) => {
  const {
    username,
    password
  } = credential;
  return rootClient.child({
    auth: {
      username,
      password
    },
    // Child client doesn't allow auth option, adding null auth header to bypass,
    // so logic in child() can rebuild the auth header based on the auth input.
    // See https://github.com/opensearch-project/OpenSearch-Dashboards/issues/2182 for details
    headers: {
      authorization: null
    }
  });
};

const getAWSClient = (credential, clientOptions) => {
  const {
    accessKey,
    secretKey,
    region,
    service
  } = credential;

  const credentialProvider = () => {
    return new Promise(resolve => {
      resolve(new _awsSdk.Credentials({
        accessKeyId: accessKey,
        secretAccessKey: secretKey
      }));
    });
  };

  return new _opensearchNext.Client({ ...(0, _aws.AwsSigv4Signer)({
      region,
      getCredentials: credentialProvider,
      service
    }),
    ...clientOptions
  });
};