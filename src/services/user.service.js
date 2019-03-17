module.exports = (() => {
  const DbService = require("./db.service.js");
  const StudentService = require("./student.service.js");
  const TutorService = require("./tutor.service.js");
  const MusicianService = require("./musician.service.js");
  const OrganizationService = require("./organization.service.js");
  const { UserRole } = require("../constants");

  function getUserByNameAndPassword(reqBody) {
    const { username, password } = reqBody;
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `select * from user where name = '${username}' AND password = '${password}'`;
      dbConnection.query(sql, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        let userResult = result[0];

        if (userResult.type == UserRole.STUDENT) {
          StudentService.getStudentById(userResult.id)
            .then(studentResult => {
              const { instrument } = studentResult;
              resolve({
                ...userResult,
                instrument
              });
            })
            .catch();
        } else if (userResult.type == UserRole.TUTOR) {
          TutorService.getTutorById(userResult.id)
            .then(tutorResult => {
              const { location, instrument } = tutorResult;
              resolve({ ...userResult, location, instrument });
            })
            .catch();
        } else if (userResult.type == UserRole.MUSICIAN) {
          MusicianService.getMusicianById(userResult.id)
            .then(musicianResult => {
              const { instrument } = musicianResult;
              resolve({ ...userResult, instrument });
            })
            .catch();
        } else if (userResult.type == UserRole.ORGANIZATION) {
          OrganizationService.getOrganizationById(userResult.id)
            .then(organizationResult => {
              const { orgName } = organizationResult;
              resolve({ ...userResult, orgName });
            })
            .catch();
        } else {
          const error = "cannot determine user type";
          resolve({ error });
        }
      });
    });
  }

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
          if (err.errno == 1062) {
            reject({
              message: "username has already been registered"
            });
          } else {
            reject({
              message: err.sqlMessage
            });
          }
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
            reject({
              message: err.sqlMessage
            });
          });
      });
    });
  }

  function insertUserRole(reqBody) {
    const { type } = reqBody;
    return new Promise((resolve, reject) => {
      if (type == UserRole.STUDENT) {
        StudentService.insertStudent(reqBody)
          .then(res => resolve(res))
          .catch(err => reject(err));
      } else if (type == UserRole.TUTOR) {
        TutorService.insertTutor(reqBody)
          .then(res => resolve(res))
          .catch(err => reject(err));
      } else if (type == UserRole.MUSICIAN) {
        MusicianService.insertMusician(reqBody)
          .then(res => resolve(res))
          .catch(err => reject(err));
      } else if (type == UserRole.ORGANIZATION) {
        OrganizationService.insertOrganization(reqBody)
          .then(res => resolve(res))
          .catch(err => reject(err));
      } else {
        const error = "cannot determine user type";
        reject({ error });
      }
    });
  }

  return { insertUser, getAllUsers, getUserByNameAndPassword };
})();
