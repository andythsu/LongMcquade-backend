const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "longmcquade"
};

const dbProdConfig = {
  host: "sql9.freemysqlhosting.net",
  user: "sql9283773",
  password: "qfy5u2iddr",
  database: "sql9283773"
};

const serverConfig = {
  port: process.env.PORT || 3000,
  prod: false
};
module.exports = { dbConfig, serverConfig, dbProdConfig };
