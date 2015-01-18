/*
 *
 * https://github.com/fmvilas/json-tpl
 *
 * Copyright (c) 2014 Francisco Méndez Vilas
 * Licensed under the MIT license.
 */

'use strict';

var moment = require('moment');

function getDefaultValue(item) {
  var def = item.default;

  if( def === 'timestamp' ) {
    def = moment().utc().format();
  } else if( typeof def === 'function' ) {
    def = def() || null;
  } else if( def === undefined ) {
    def = null;
  }

  return def;
}

function getValue(template, key, data) {
  var def = template[key].default || null,
      ret;

  if( !template[key].read_only ) {
    switch(template[key].type) {
      case 'float':
        ret = parseFloat(data[key]);
        break;
      case 'number':
      case 'int':
        ret = parseInt(data[key], 10);
        break;
      case 'string':
        ret = '' + data[key];
        break;
      default:
        ret = data[key];
    }

    if( def !== undefined && data[key] === undefined ) {
      ret = getDefaultValue(template[key]);
    }
  } else {
    ret = getDefaultValue(template[key]);
  }

  return ret;
}

exports.parse = function(template, data) {
  var key,
      output = {},
      attribute,
      value,
      attribute_exists;

  for(key in template) {
    attribute_exists = template.hasOwnProperty(key);

    if( attribute_exists ) {
      attribute = template[key];
      value = data[key];

      if( attribute.required === true && value === undefined ) {
        throw new Error('Missing required attribute: ' + key + '.');
      }

      if( value !== undefined || attribute.read_only ) {
        output[key] = getValue(template, key, data);
      }
    }
  }

  return output;
};
