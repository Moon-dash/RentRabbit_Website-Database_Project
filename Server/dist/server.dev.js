"use strict";

// import required modules
var express = require('express');

var cors = require('cors'); // create the app and router


var app = express();
var router = express.Router(); // import db connection

var createConnection = require('./db/connection'); // constant variables


var port = 5000; // middlewares

app.use(cors()); // route to get all the tools in the database

router.get('/tools', function (req, res) {
  var conn = createConnection();
  var Select_All_Tools_Query = 'SELECT * FROM tools;';
  conn.query(Select_All_Tools_Query, function (err, rows) {
    if (err) throw err; //could be tools: rows

    res.json({
      data: rows
    });
  });
  conn.end();
}); // route to get all the users

router.get('/users', function (req, res) {
  var conn = createConnection(); // query to get all the users

  var usersQuery = 'SELECT * FROM users;';
  conn.query(usersQuery, function (err, rows) {
    if (err) throw err;
    res.json({
      data: rows
    });
  });
  conn.end();
}); // query to get all the companies

router.get('/companies', function (req, res) {
  var conn = createConnection();
  var companyQuery = 'SELECT * FROM companies;';
  conn.query(companyQuery, function (err, rows) {
    if (err) throw err;
    res.json({
      data: rows
    });
  });
  conn.end();
}); // query to get all the favourite tools

router.get('/favTools', function (req, res) {
  var conn = createConnection();
  var favQuery = 'SELECT * FROM favouritetools;';
  conn.query(favQuery, function (err, rows) {
    if (err) throw err;
    res.json({
      data: rows
    });
  });
  conn.end();
}); // query to get all the unavailable tools

router.get('/unavTools', function (req, res) {
  var conn = createConnection();
  var unavQuery = 'SELECT * FROM unavailabletools;';
  conn.query(unavQuery, function (err, rows) {
    if (err) throw err;
    res.json({
      data: rows
    });
  });
  conn.end();
}); // query to get all the user transactions

router.get('/userTransactions', function (req, res) {
  var conn = createConnection();
  var userTransQuery = 'SELECT * FROM usertransactions;';
  conn.query(userTransQuery, function (err, rows) {
    if (err) throw err;
    res.json({
      data: rows
    });
  });
  conn.end();
}); // query to get all the company transactions

router.get('/companyTransactions', function (req, res) {
  var conn = createConnection();
  var compTransQuery = 'SELECT * FROM companytransactions;';
  conn.query(compTransQuery, function (err, rows) {
    if (err) throw err;
    res.json({
      data: rows
    });
  });
  conn.end();
}); // enable app to use the router

app.use('/', router); // start the app

app.listen(port); // message that the server started successfully

console.log("express server started at http://localhost:".concat(port, "/"));