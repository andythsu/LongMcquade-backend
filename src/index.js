const express = require("express");
const app = express();
const config = require("./config.js");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const { dbConfig, serverConfig } = config;

const { DbService } = require("./services");

const { UserApi, ForumApi } = require("./apis");

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(bodyParser.json());
app.use("/user", UserApi);
app.use("/forum", ForumApi);

try {
  var connection = mysql.createConnection(dbConfig);
  connection.connect(err => {
    if (err) {
      // throw new Error(err);
    }
    console.log("connected");
    DbService.setConnection(connection);
  });
} catch (err) {
  // console.error(err);
}

app.listen(serverConfig.port, () => {
  console.log(`server is listening on port ${serverConfig.port}`);
});
