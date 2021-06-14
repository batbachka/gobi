module.exports = function (initialState, manifest) {
    return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <title>Gobi</title>
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="stylesheet" href="/css/swiper.min.css">
        <script></script>
      </head>
      <body>
        <div id="wrap" ></div>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>  
        <script src=${process.env.NODE_ENV === 'development' ? '/dist/front.js' : manifest["front.js"]}></script>
      </body>
    </html>
  `
};
