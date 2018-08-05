#!/usr/bin/node
var API = {
  router: {
    1: function(creds, request, cheerio) {
      return this.fetchDHCPClientsList(creds, request, cheerio)
    },
    2: function(creds, request, cheerio) {
      return this.fetchTraffic(creds, request, cheerio)
    }
  },

  createDataDhcp: function(arr) {
    const data = {}
    for (let i = 0; i + 4 < arr.length; i = i + 4) {
      data[`ROW_${i / 4}`] = {
        NAME: arr[i],
        MAC: arr[i + 1],
        IP: arr[i + 2],
        TIME: arr[i + 3]
      }
    }
    return JSON.stringify(data)
  },

  createDatatraffic: function(arr) {
    const data = {}
    for (let i = 0; i + 13 < arr.length; i = i + 13) {
      data[`ROW_${i / 13}`] = {
        IP: arr[i + 1],
        MAC: arr[i + 2],
        TOT_PKTS: arr[i + 3],
        TOT_BYTE: arr[i + 4],
        CUR_PKTS: arr[i + 5],
        CUR_BYTE: arr[i + 6],
        ICMP: arr[i + 7] + "/" + arr[i + 8],
        UDP: arr[i + 9] + "/" + arr[i + 10],
        SYT: arr[i + 11] + "/" + arr[i + 12]
      }
    }
    return JSON.stringify(data)
  },

  fetchDHCPClientsList: function(creds, request, cheerio) {
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
      console.log(res)
      eval(res.html())
      console.log(self.createDataDhcp(DHCPDynList))
    })
  },

  fetchTraffic: function(creds, request, cheerio) {
    var self = this
    var url =
      "http://" +
      creds.username +
      ":" +
      creds.password +
      "@" +
      creds.host +
      "/userRpm/SystemStatisticRpm.htm?interval=5&sortType=3&Num_per_page=50&Goto_page=1"
    request(url, function(error, response, html) {
      if (error) {
        console.log("ooppsss error " + error + " " + response)
      }
      var $ = cheerio.load(html)
      var res = $("script")
      eval(res.html())
      console.log(self.createDatatraffic(statList))
    })
  },

  run: function(params) {
    var request = require("request")
    var cheerio = require("cheerio")
    var creds = require("./cred.json")

    console.log("Content-Type: application/json; charset=utf-8\n")
    var routerKey = params.t || 1
    this.router[routerKey]
      ? this.router[routerKey].call(this, creds, request, cheerio)
      : console.error("No such router")
  }
}

module.exports = API
