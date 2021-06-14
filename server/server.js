import express from 'express';
import webpack from 'webpack';
import path from 'path';
import React from 'react';
import webpackConfig from '../webpack.config.dev';
const app = express();
const compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {
    hot: true,
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use('/',express.static(path.join(__dirname, '../static')));

const webRouter = express.Router();
require('./routers')(webRouter);
app.use(webRouter);


app.listen(8025, function(err) {
    if (err) {
        return;
    }
    console.log("app started ..., on port 8025");
});