"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGlobalFlyout = exports.GlobalFlyoutProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
const FlyoutMultiContentContext = /*#__PURE__*/(0, _react.createContext)(undefined);
const DEFAULT_FLYOUT_PROPS = {
  'data-test-subj': 'flyout',
  size: 'm',
  maxWidth: 500
};

const GlobalFlyoutProvider = ({
  children
}) => {
  const [showFlyout, setShowFlyout] = (0, _react.useState)(false);
  const [activeContent, setActiveContent] = (0, _react.useState)(undefined);
  const {
    id,
    Component,
    props,
    flyoutProps
  } = activeContent !== null && activeContent !== void 0 ? activeContent : {};
  const addContent = (0, _react.useCallback)(content => {
    setActiveContent(prev => {
      if (prev !== undefined) {
        if (prev.id !== content.id && prev.cleanUpFunc) {
          // Clean up anything from the content about to be removed
          prev.cleanUpFunc();
        }
      }

      return content;
    });
    setShowFlyout(true);
  }, []);
  const closeFlyout = (0, _react.useCallback)(() => {
    setActiveContent(undefined);
    setShowFlyout(false);
  }, []);
  const removeContent = (0, _react.useCallback)(contentId => {
    if (contentId === id) {
      closeFlyout();
    }
  }, [id, closeFlyout]);
  const mergedFlyoutProps = (0, _react.useMemo)(() => {
    return { ...DEFAULT_FLYOUT_PROPS,
      onClose: closeFlyout,
      ...flyoutProps
    };
  }, [flyoutProps, closeFlyout]);
  const context = {
    addContent,
    removeContent,
    closeFlyout
  };
  const ContentFlyout = showFlyout && Component !== undefined ? Component : null;
  return /*#__PURE__*/_react.default.createElement(FlyoutMultiContentContext.Provider, {
    value: context
  }, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children, ContentFlyout && /*#__PURE__*/_react.default.createElement(_eui.EuiFlyout, mergedFlyoutProps, /*#__PURE__*/_react.default.createElement(ContentFlyout, props))));
};

exports.GlobalFlyoutProvider = GlobalFlyoutProvider;

const useGlobalFlyout = () => {
  const ctx = (0, _react.useContext)(FlyoutMultiContentContext);

  if (ctx === undefined) {
    throw new Error('useGlobalFlyout must be used within a <GlobalFlyoutProvider />');
  }

  const isMounted = (0, _react.useRef)(false);
  /**
   * A component can add one or multiple content to the flyout
   * during its lifecycle. When it unmounts, we will remove
   * all those content added to the flyout.
   */

  const contents = (0, _react.useRef)(undefined);
  const {
    removeContent,
    addContent: addContentToContext
  } = ctx;
  (0, _react.useEffect)(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  const getContents = (0, _react.useCallback)(() => {
    if (contents.current === undefined) {
      contents.current = new Set();
    }

    return contents.current;
  }, []);
  const addContent = (0, _react.useCallback)(content => {
    getContents().add(content.id);
    return addContentToContext(content);
  }, [getContents, addContentToContext]);
  (0, _react.useEffect)(() => {
    return () => {
      if (!isMounted.current) {
        // When the component unmounts, remove all the content it has added to the flyout
        Array.from(getContents()).forEach(removeContent);
      }
    };
  }, [removeContent, getContents]);
  return { ...ctx,
    addContent
  };
};

exports.useGlobalFlyout = useGlobalFlyout;