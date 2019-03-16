module.exports = (() => {
  const DbService = require("./db.service.js");

  function rateTutor(reqBody) {
    const { studentId, tutorId, rate } = reqBody;
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `select * from tutor_rating where studentId = ${studentId} AND tutorId = ${tutorId}`;
      let newSql = ``;
      dbConnection.query(sql, (err, result) => {
        if (err) {
          console.log("sql: ", sql);
          reject({
            message: err.sqlMessage
          });
          return;
        }
        if (result.length > 0) {
          // update if already exists
          newSql = `update tutor_rating set rate = ${rate} where studentId = ${studentId} AND tutorId = ${tutorId}`;
        } else {
          // insert if doesn't exist
          newSql = `insert into tutor_rating (studentId, tutorId, rate) values (${studentId},${tutorId},${rate})`;
        }
        dbConnection.query(newSql, (err, result) => {
          if (err) {
            console.log("sql: ", newSql);
            reject({
              message: err.sqlMessage
            });
            return;
          }
          resolve(result);
        });
      });
    });
  }

  function getPassedClassesTutors(id) {
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `select * from class_info inner join tutor on class_info.tutorId = tutor.id inner join user on class_info.tutorId = user.id where available_time <= now() AND class_info.studentId = ${id}`;
      dbConnection.query(sql, (err, result) => {
        if (err) {
          console.log("sql: ", sql);
          reject({
            message: err.sqlMessage
          });
          return;
        }
        resolve(result);
      });
    });
  }

  function getUpcomingClasses(id) {
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `select * from student inner join (select id as class_info_id, studentId, tutorId, available_time from class_info) as class_info on student.id = class_info.studentId inner join (select id as tutor_id, location as tutor_location, instrument as tutor_instrument from tutor) as tutor on tutor.tutor_id = class_info.tutorId inner join (select id as tutor_id, name as tutor_name from user) as user on tutor.tutor_id = user.tutor_id inner join (select id as available_time_id, time from available_time) as available_time on available_time.available_time_id = class_info.available_time where student.id = ${id}`;
      dbConnection.query(sql, (err, result) => {
        if (err) {
          console.log("sql: ", sql);
          reject({
            message: err.sqlMessage
          });
          return;
        }
        resolve(result);
      });
    });
  }

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
          reject({
            message: err.sqlMessage
          });
          return;
        }
        resolve(result);
      });
    });
  }

  return {
    insertStudent,
    getStudentById,
    getUpcomingClasses,
    getPassedClassesTutors,
    rateTutor
  };
})();
