module.exports = (() => {
  const DbService = require("./db.service.js");
  const StudentService = require("./student.service.js");
  const TutorService = require("./tutor.service.js");
  const MusicianService = require("./musician.service.js");
  const OrganizationService = require("./organization.service.js");
  const { UserRole } = require("../constants");

  function getAllUsers() {
    return new Promise((resolve, reject) => {
      const sql = "select * from user";
      const dbConnection = DbService.getConnection();
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

  function insertUser(reqBody) {
    const { name, age, gender, password, type } = reqBody;
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `insert into user(name, age, gender, password, type) values ('${name}', ${age}, ${gender}, '${password}', ${type})`;
      dbConnection.query(sql, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        const { insertId } = result;

        reqBody = { ...reqBody, userId: insertId };

        insertUserRole(reqBody)
          .then(res =>
            resolve({
              userId: insertId,
              role: UserRole[type]
            })
          )
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  function insertUserRole(reqBody) {
    const { type } = reqBody;
    return new Promise((resolve, reject) => {
      if (UserRole[type] === "student") {
        StudentService.insertStudent(reqBody)
          .then(res => resolve(res))
          .catch(err => reject(err));
      } else if (UserRole[type] === "tutor") {
        TutorService.insertTutor(reqBody)
          .then(res => resolve(res))
          .catch(err => reject(err));
      } else if (UserRole[type] === "musician") {
        MusicianService.insertMusician(reqBody)
          .then(res => resolve(res))
          .catch(err => reject(err));
      } else if (UserRole[type] === "organization") {
        OrganizationService.insertOrganization(reqBody)
          .then(res => resolve(res))
          .catch(err => reject(err));
      } else {
        const error = "cannot determine user type";
        reject({ error });
      }
    });
  }

  return { insertUser, getAllUsers };
})();
