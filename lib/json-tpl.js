/*
 *
 * https://github.com/fmvilas/json-tpl
 *
 * Copyright (c) 2014 Francisco Méndez Vilas
 * Licensed under the MIT license.
 */

'use strict';

function getValue(template, key, data) {
  var def = template[key].default,
    ret;

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
    if( def === 'timestamp' ) {
      def =
    }

    ret = def;
  }

  return ret;
}

exports.parse = function(template, data) {
  var key,
    output = {};

  for(key in template) {
    if(template.hasOwnProperty(key)) {
      output[key] = getValue(template, key, data);
    }
  }

  return output;
};
