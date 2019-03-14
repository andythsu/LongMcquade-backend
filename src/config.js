const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "longmcquade"
};
const serverConfig = {
  port: process.env.PORT || 3000
};
module.exports = { dbConfig, serverConfig };
