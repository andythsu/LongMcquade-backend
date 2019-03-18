module.exports = (() => {
  const DbService = require("./db.service.js");
  function insertMusician(reqBody) {
    const { userId, instrument } = reqBody;
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `insert into musician (id, instrument) values (${userId},"${instrument}")`;
      dbConnection.query(sql, (err, result) => {
        if (err) {
          console.log("sql: ", sql);
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  function getMusicianById(id) {
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `select * from musician where id = ${id}`;
      dbConnection.query(sql, (err, result) => {
        if (err) {
          console.log("sql: ", sql);
          reject(err);
          return;
        }
        resolve(result[0]);
      });
    });
  }

  return { insertMusician, getMusicianById };
})();
