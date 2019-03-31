const dbConfig = {
  host: process.env.dbHost || "localhost",
  user: process.env.dbUser || "root",
  password: process.env.dbPassword || "",
  database: process.env.dbDatabase || "longmcquade"
};

const serverConfig = {
  port: process.env.PORT || 3000
};
module.exports = { dbConfig, serverConfig };
