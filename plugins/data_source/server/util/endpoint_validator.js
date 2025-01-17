"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidURL = isValidURL;

var _dnsSync = _interopRequireDefault(require("dns-sync"));

var _ipCidr = _interopRequireDefault(require("ip-cidr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
function isValidURL(endpoint, deniedIPs) {
  // Check the format of URL, URL has be in the format as
  // scheme://server/path/resource otherwise an TypeError
  // would be thrown.
  let url;

  try {
    url = new URL(endpoint);
  } catch (err) {
    return false;
  }

  if (!(Boolean(url) && (url.protocol === 'http:' || url.protocol === 'https:'))) {
    return false;
  }

  const ip = getIpAddress(url);

  if (!ip) {
    return false;
  } // IP CIDR check if a specific IP address fall in the
  // range of an IP address block


  for (const deniedIP of deniedIPs !== null && deniedIPs !== void 0 ? deniedIPs : []) {
    const cidr = new _ipCidr.default(deniedIP);

    if (cidr.contains(ip)) {
      return false;
    }
  }

  return true;
}
/**
 * Resolve hostname to IP address
 * @param {object} urlObject
 * @returns {string} configuredIP
 * or null if it cannot be resolve
 * According to RFC, all IPv6 IP address needs to be in []
 * such as [::1].
 * So if we detect a IPv6 address, we remove brackets.
 */


function getIpAddress(urlObject) {
  const hostname = urlObject.hostname;

  const configuredIP = _dnsSync.default.resolve(hostname);

  if (configuredIP) {
    return configuredIP;
  }

  if (hostname.startsWith('[') && hostname.endsWith(']')) {
    return hostname.substr(1).slice(0, -1);
  }

  return null;
}