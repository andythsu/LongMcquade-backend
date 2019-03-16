module.exports = (() => {
  const DbService = require("./db.service.js");

  function insertForum(reqBody) {
    const { userId, subject, content } = reqBody;
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `insert into forum (userId, subject, content) values (${userId},'${subject}','${content}')`;
      dbConnection.query(sql, (err, result) => {
        if (err) {
          reject({
            message: err.sqlMessage
          });
          return;
        }

        resolve(result);
      });
    });
  }

  function getAllForums() {
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `select * from forum inner join user on forum.userId = user.id`;
      dbConnection.query(sql, (err, result) => {
        if (err) {
          reject({
            message: err.sqlMessage
          });
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
          reject({
            message: err.sqlMessage
          });
          return;
        }

        resolve(result);
      });
    });
  }

  return { getAllForums, getForumsbyUserId, insertForum };
})();
