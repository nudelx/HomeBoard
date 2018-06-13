#!/usr/bin/node
var API = {
  createData: function (arr) {
    const data = {}
    for (let i = 0; i + 4 < arr.length; i = i + 4) {
      // console.log("NAME => ", arr[i])
      // console.log("MAC => ", arr[i+1])
      // console.log("IP => ", arr[i+2])
      // console.log("TIME => ", arr[i+3])
      // console.log('***********************')
      data[`ROW_${i / 4}`] = {
        NAME: arr[i],
        MAC: arr[i + 1],
        IP: arr[i + 2],
        TIME: arr[i + 3]
      }
    }
    return JSON.stringify(data)
  },

  fetchDHCPClientsList: function (creds, request, cheerio) {
    var self = this
    var url =
      "http://" +
      creds.username +
      ":" +
      creds.password +
      "@" +
      creds.host +
      "/userRpm/AssignedIpAddrListRpm.htm"
    request(url, function(error, response, html) {
      if (error) {
        console.log("ooppsss error " + error + " " + response)
      }
      var $ = cheerio.load(html)
      var res = $("SCRIPT")
      eval(res.html())
      console.log(self.createData(DHCPDynList))
    })
  },

  run: function(params) {
    var request = require("request")
    var cheerio = require("cheerio")
    var creds = require("./cred.json")
    console.log("Content-Type: application/json; charset=utf-8\n")
    this.fetchDHCPClientsList(creds, request, cheerio)
  },
}

module.exports = API
