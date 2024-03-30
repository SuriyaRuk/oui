"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDataSourceError = exports.DataSourceError = void 0;

var _elasticsearch = require("elasticsearch");

var _server = require("../../../../../src/core/server");

var _common = require("../../../opensearch_dashboards_utils/common");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /*
                                                                                                                                                                                                                   * Copyright OpenSearch Contributors
                                                                                                                                                                                                                   * SPDX-License-Identifier: Apache-2.0
                                                                                                                                                                                                                   */

class DataSourceError extends _common.OsdError {
  // must have statusCode to avoid route handler in search.ts to return 500
  constructor(error, context, statusCode) {
    let message;

    if (context) {
      message = context;
    } else if (isResponseError(error)) {
      message = JSON.stringify(error.meta.body);
    } else {
      message = error.message;
    }

    super('Data Source Error: ' + message);

    _defineProperty(this, "statusCode", void 0);

    if (statusCode) {
      this.statusCode = statusCode;
    } else if (error.statusCode) {
      this.statusCode = error.statusCode;
    } else {
      this.statusCode = 400;
    }
  }

}

exports.DataSourceError = DataSourceError;

const createDataSourceError = (error, message) => {
  // handle saved object client error, while retrieve data source meta info
  if (_server.SavedObjectsErrorHelpers.isSavedObjectsClientError(error)) {
    return new DataSourceError(error, error.output.payload.message, error.output.statusCode);
  } // cast OpenSearch client 401 response error to 400, due to https://github.com/opensearch-project/OpenSearch-Dashboards/issues/2591


  if (isResponseError(error) && error.statusCode === 401) {
    return new DataSourceError(error, JSON.stringify(error.meta.body), 400);
  } // cast legacy client 401 response error to 400


  if (error instanceof _elasticsearch.errors.AuthenticationException) {
    return new DataSourceError(error, error.message, 400);
  } // handle all other error that may or may not comes with statuscode


  return new DataSourceError(error, message);
};

exports.createDataSourceError = createDataSourceError;

const isResponseError = error => {
  return Boolean(error.body && error.statusCode && error.headers);
};