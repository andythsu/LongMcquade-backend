module.exports = (() => {
  const DbService = require("./db.service.js");

  function getStudentById(id) {
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `select * from student where id = ${id}`;
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

  function insertStudent(reqBody) {
    const { userId } = reqBody;
    let { instrument } = reqBody;

    // instrument can be undefined, so assign them empty string value
    if (!instrument) instrument = "";

    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `insert into student(id, instrument) values (${userId}, '${instrument}')`;
      dbConnection.query(sql, (err, result) => {
        if (err) {
          console.log("sql", sql);
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  return { insertStudent, getStudentById };
})();
