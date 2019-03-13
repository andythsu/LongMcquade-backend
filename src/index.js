const express = require("express");
const app = express();
const config = require("./config.js");

const { dbConfig, serverConfig } = config;

const { EntryApi } = require("./api");

const mysql = require("mysql");

var connection = mysql.createConnection(dbConfig);

console.log("connection: ", connection);

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

app.listen(serverConfig.port, () =>
  console.log(`Example app listening on port ${serverConfig.port}!`)
);
