"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataSourceConnectionValidator = void 0;

var _error = require("../lib/error");

var _data_sources = require("../../common/data_sources");

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
class DataSourceConnectionValidator {
  constructor(callDataCluster, dataSourceAttr) {
    this.callDataCluster = callDataCluster;
    this.dataSourceAttr = dataSourceAttr;
  }

  async validate() {
    try {
      var _this$dataSourceAttr$, _this$dataSourceAttr$2;

      // Amazon OpenSearch Serverless does not support .info() API
      if (((_this$dataSourceAttr$ = this.dataSourceAttr.auth) === null || _this$dataSourceAttr$ === void 0 ? void 0 : (_this$dataSourceAttr$2 = _this$dataSourceAttr$.credentials) === null || _this$dataSourceAttr$2 === void 0 ? void 0 : _this$dataSourceAttr$2.service) === _data_sources.SigV4ServiceName.OpenSearchServerless) return await this.callDataCluster.cat.indices();
      return await this.callDataCluster.info();
    } catch (e) {
      throw (0, _error.createDataSourceError)(e);
    }
  }

}

exports.DataSourceConnectionValidator = DataSourceConnectionValidator;