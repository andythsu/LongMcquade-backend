module.exports = (() => {
  const DbService = require("./db.service.js");
  function insertOrganization(userId, instrument) {
    return new Promise((resolve, reject) => {});
  }

  function getOrganizationById(id) {
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `select * from organization where id = ${id}`;
      dbConnection.query(sql, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result[0]);
      });
    });
  }

  return { insertOrganization, getOrganizationById };
})();
