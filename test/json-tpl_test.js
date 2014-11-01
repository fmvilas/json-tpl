/*global describe,it*/
'use strict';
var assert = require('assert'),
  jsonTpl = require('../lib/json-tpl.js');

describe('json-tpl node module.', function() {
  it('must be awesome', function() {
    assert( jsonTpl.awesome(), 'awesome');
  });
});
