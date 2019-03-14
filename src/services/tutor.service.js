module.exports = (() => {
  const DbService = require("./db.service.js");
  function insertTutor(reqBody) {
    const { userId } = reqBody;
    let { location, instrument } = reqBody;

    // location and instrument can be undefined, so assign them empty string value
    if (!location) location = "";
    if (!instrument) instrument = "";

    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `insert into tutor(id, location, instrument) values (${userId}, '${location}', '${instrument}')`;
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

  return { insertTutor };
})();
