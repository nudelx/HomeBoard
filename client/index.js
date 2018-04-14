var CLIENT = {
  run: () => {
    console.log("Content-type: text/html\n");
    console.log('<h1>Page</h1>')
    console.log('<pre>'+JSON.stringify(API)+'</pre>')
  }
}

module.exports = CLIENT
