const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "longmcquade"
};

const dbProdConfig = {
  host: "remotemysql.com",
  user: "2dqTYhXoQo",
  password: "ZVv85fDuQq",
  database: "2dqTYhXoQo"
};

const serverConfig = {
  port: process.env.PORT || 3000,
  prod: true
};
module.exports = { dbConfig, serverConfig, dbProdConfig };
