"use strict";

var express = require("express");
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');


var apiRoutes = require("./routes/apiRoutes");



function serverListeningHandler(){
  console.log('Server listening at http://'+server.configuration.host +':'+server.configuration.port);
}

function perimitirCrossDomain(req, res, next) {
  console.log('cross domain');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin',  '*');
  res.header('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');
  res.header ('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

function start(){
    mongoose.connect('mongodb://carlos:1q2w3e4r@ds047802.mongolab.com:47802/carlos');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', function callback(){
      console.log('conexion establecida');
      console.log('Database serverCarlos');

      app.use(perimitirCrossDomain);
      app.use(logger('dev'));
      app.use(bodyParser.urlencoded({ extended : true }));      
      app.use(bodyParser.json());
      apiRoutes(app);
      app.listen(server.configuration.port, serverListeningHandler);
    });

}


var server = {
  configuration: {
    host: "localhost",
    port: "3000"
  },
  start: start
}

module.exports = server;
