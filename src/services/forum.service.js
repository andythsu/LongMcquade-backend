module.exports = (() => {
  const DbService = require("./db.service.js");

  function getAllForums() {
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `select * from forum`;
      dbConnection.query(sql, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
      });
    });
  }

  function getForumsbyUserId(UserId) {
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `select * from forum where userId = ${UserId}`;
      dbConnection.query(sql, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
      });
    });
  }

  return { getAllForums, getForumsbyUserId };
})();
