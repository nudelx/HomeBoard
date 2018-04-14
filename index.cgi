#!/usr/bin/node
const API = require('./server/api')
const CLIENT = require('./client/index')
parseQueryString = function (QUERY_STRING) {
  var PARAMS = { action: 'html'}
  var PAIRS_ARR = QUERY_STRING ? QUERY_STRING.split('&') : null
  if (!PAIRS_ARR) return PARAMS
  PAIRS_ARR.map( function (item) {
    var [ key, value ] = item.split('=');
    PARAMS[key] = value
  })
  return PARAMS;

}

function main () {
  var params = parseQueryString(process.env.QUERY_STRING);
  params.action === 'API' ? API.run(params) : CLIENT.run()

}

main();
