#!/usr/bin/node

var header = "Content-type: text/plain\n";
console.log(header);

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

function main () {

  var request = require('request');
  var cheerio = require('cheerio');
  var creds = require('./cred.json')
  // console.log(creds)

  var url = 'http://' + creds.username + ':' + creds.password + '@192.168.0.1/userRpm/AssignedIpAddrListRpm.htm';
  request(url, function(error, response, html) {
    if ( error ) { console.log("ooppsss error "+ error + " " + response); }
    var $ = cheerio.load(html);
    var res = $('SCRIPT');
    eval(res.html());
    console.log(createData(DHCPDynList));

  })
}

main();
