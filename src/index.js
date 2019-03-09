const express = require("express");
const app = express();
const config = require("./config.js");

const { port } = config;

const { EntryApi } = require("./api");

app.use("/", EntryApi);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
