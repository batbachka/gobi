import path from "path";
import mongoose from 'mongoose';
import winston from 'winston';
const env = process.env.NODE_ENV;
import express from "express";

const app = express();
let test = app.listen('8025',function (err) {
    if(err){
        winston.error('app start error');
        winston.error(err);
        process.exit(1)
    }else{
        winston.info('app started port: %s', '8025')
    }
});
var configServer = {
    mongoUrl:'mongodb://103.143.40.220:27017/gobi',
    option: {
        "auth": { "authSource": "admin" },
        "user": "amjilt",
        "pass": "shijircom",
        "useMongoClient": true
    },
    logPath:path.resolve(__dirname,"logs")
};
app.use('/',express.static(path.join(__dirname, '../static')));

app.set('view options', { charset: 'UTF-8' });

const webRouter = express.Router();
require('./routers')(webRouter,);
app.use(webRouter);

if(env === 'development') {
    mongoose.connect("mongodb://localhost:27017/gobi");
} else {
    mongoose.connect(configServer.mongoUrl, configServer.option);
}
mongoose.connection.on('open', function (ref) {
    winston.info('db connected');
});
mongoose.connection.on('error',function (error) {
    winston.error('db connection error:', error);
});
