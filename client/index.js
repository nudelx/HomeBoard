var CLIENT = {
  run: () => {
    console.log("Content-type: text/html\n")
    const page = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"><meta name="theme-color" content="#000000">
    <link rel="manifest" href="/manifest.json">
    <link rel="shortcut icon" href="/favicon.ico"><title>React App</title>
    <link href="static/css/react_app.css" rel="stylesheet">
  </head><body><noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
    <script type="text/javascript" src="static/js/react_app.js"></script></body></html>`
    console.log(page)
  }
}

module.exports = CLIENT
