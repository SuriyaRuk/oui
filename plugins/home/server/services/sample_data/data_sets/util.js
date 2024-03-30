"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSavedObjectsWithDataSource = exports.appendDataSourceId = void 0;

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
const appendDataSourceId = id => {
  return dataSourceId => dataSourceId ? `${dataSourceId}_` + id : id;
};

exports.appendDataSourceId = appendDataSourceId;

const getSavedObjectsWithDataSource = (saveObjectList, dataSourceId, dataSourceTitle) => {
  if (dataSourceId) {
    return saveObjectList.map(saveObject => {
      saveObject.id = `${dataSourceId}_` + saveObject.id; // update reference

      if (saveObject.type === 'dashboard') {
        saveObject.references.map(reference => {
          if (reference.id) {
            reference.id = `${dataSourceId}_` + reference.id;
          }
        });
      } // update reference


      if (saveObject.type === 'visualization' || saveObject.type === 'search') {
        var _saveObject$attribute, _saveObject$attribute2, _saveObject$attribute3;

        const searchSourceString = (_saveObject$attribute = saveObject.attributes) === null || _saveObject$attribute === void 0 ? void 0 : (_saveObject$attribute2 = _saveObject$attribute.kibanaSavedObjectMeta) === null || _saveObject$attribute2 === void 0 ? void 0 : _saveObject$attribute2.searchSourceJSON;
        const visStateString = (_saveObject$attribute3 = saveObject.attributes) === null || _saveObject$attribute3 === void 0 ? void 0 : _saveObject$attribute3.visState;

        if (searchSourceString) {
          const searchSource = JSON.parse(searchSourceString);

          if (searchSource.index) {
            searchSource.index = `${dataSourceId}_` + searchSource.index;
            saveObject.attributes.kibanaSavedObjectMeta.searchSourceJSON = JSON.stringify(searchSource);
          }
        }

        if (visStateString) {
          var _visState$params;

          const visState = JSON.parse(visStateString);
          const controlList = (_visState$params = visState.params) === null || _visState$params === void 0 ? void 0 : _visState$params.controls;

          if (controlList) {
            controlList.map(control => {
              if (control.indexPattern) {
                control.indexPattern = `${dataSourceId}_` + control.indexPattern;
              }
            });
          }

          saveObject.attributes.visState = JSON.stringify(visState);
        }
      } // update reference


      if (saveObject.type === 'index-pattern') {
        saveObject.references = [{
          id: `${dataSourceId}`,
          type: 'data-source',
          name: 'dataSource'
        }];
      }

      if (dataSourceTitle) {
        if (saveObject.type === 'dashboard' || saveObject.type === 'visualization' || saveObject.type === 'search') {
          saveObject.attributes.title = saveObject.attributes.title + `_${dataSourceTitle}`;
        }
      }

      return saveObject;
    });
  }

  return saveObjectList;
};

exports.getSavedObjectsWithDataSource = getSavedObjectsWithDataSource;