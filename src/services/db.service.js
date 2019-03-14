module.exports = (() => {
  const mysql = require("mysql");
  const { dbConfig } = require("../config.js");
  let con;
  function setConnection(connection) {
    con = connection;
  }

  function getConnection() {
    return con;
  }
  // function getConnection() {
  //   return new Promise((resolve, reject) => {
  //     if (!connection) {
  //       console.log("sss");
  //       resolve(mysql.createConnection(dbConfig).connect());
  //     } else {
  //       resolve(connection);
  //     }
  //   });
  // }
  return { setConnection, getConnection };
})();
