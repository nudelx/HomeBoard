#!/usr/bin/node
console.log("Content-type: text/plain\n");

var createData = (arr) => {
  const data = {}
  for ( let i= 0; i + 4 < arr.length; i=i+4)
  {
    // console.log("NAME => ", arr[i])
    // console.log("MAC => ", arr[i+1])
    // console.log("IP => ", arr[i+2])
    // console.log("TIME => ", arr[i+3])
    // console.log('***********************')
    data[`row_${i/4}`] = {
      NAME: arr[i],
      MAC: arr[i+1],
      IP: arr[i+2],
      TIME: arr[i+3]
    }
  }
  return data
}

var fetchDHCPClientsList = function (creds, request, cheerio) {
  var url = 'http://' + creds.username + ':' + creds.password + '@'+creds.host+'/userRpm/AssignedIpAddrListRpm.htm';
  request(url, function(error, response, html) {
    if ( error ) { console.log("ooppsss error "+ error + " " + response); }
    var $ = cheerio.load(html);
    var res = $('SCRIPT');
    eval(res.html());
    console.log(createData(DHCPDynList));
  })
}

parseQueryString = function (QUERY_STRING) {
  var PARAMS = {}
  var PAIRS_ARR = QUERY_STRING ? QUERY_STRING.split('&') : null
  if (!PAIRS_ARR) return
  PAIRS_ARR.map( function (item) {
    var [ key, value ] = item.split('=');
    PARAMS[key] = value
  })
  return PARAMS;

}

function main () {
  var params = parseQueryString(process.env.QUERY_STRING);
  var request = require('request');
  var cheerio = require('cheerio');
  var creds = require('./cred.json')
  fetchDHCPClientsList(creds, request, cheerio);

}

main();
