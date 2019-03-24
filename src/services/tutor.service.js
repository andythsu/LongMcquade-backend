module.exports = (() => {
  const DbService = require("./db.service.js");

  function insertAvailableTime(reqBody) {
    const { time, tutorId } = reqBody;
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `insert into available_time (tutorId, time) values (${tutorId},"${time}")`;
      dbConnection.query(sql, (err, result) => {
        if (err) {
          console.log("sql", sql);
          reject({
            message: err.sqlMessage
          });
        }
        resolve(result);
      });
    });
  }

  function getUpcomingClasses(tutorId) {
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `select * from tutor inner join (select id as class_info_id, studentId, tutorId, available_time from class_info) as class_info on tutor.id = class_info.tutorId inner join (select id as student_id from student) as student on student.student_id = class_info.studentId inner join (select id as user_id, name as student_name from user) as user on student.student_id = user.user_id inner join (select id as available_time_id, time from available_time) as available_time on available_time.available_time_id = class_info.available_time where tutor.id = ${tutorId} AND available_time.time >= now() order by available_time.time asc`;
      dbConnection.query(sql, (err, result) => {
        if (err) {
          console.log("sql", sql);
          reject(err);
        }
        resolve(result);
      });
    });
  }

  function getPassedClasses(tutorId) {
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `select * from tutor inner join (select id as class_info_id, studentId, tutorId, available_time from class_info) as class_info on tutor.id = class_info.tutorId inner join (select id as student_id from student) as student on student.student_id = class_info.studentId inner join (select id as user_id, name as student_name from user) as user on student.student_id = user.user_id inner join (select id as available_time_id, time from available_time) as available_time on available_time.available_time_id = class_info.available_time where tutor.id = ${tutorId} AND available_time.time <= now() order by available_time.time desc`;
      dbConnection.query(sql, (err, result) => {
        if (err) {
          console.log("sql", sql);
          reject(err);
        }
        resolve(result);
      });
    });
  }

  function bookTutor(reqBody) {
    const { studentId, tutorId, available_time } = reqBody;
    return new Promise((resolve, reject) => {
      if (!studentId || !tutorId || !available_time) {
        reject({
          message: "some fields not defined"
        });
      } else {
        const dbConnection = DbService.getConnection();
        const sql = `insert into class_info (studentId, tutorId, available_time) values (${studentId}, ${tutorId}, ${available_time})`;
        dbConnection.query(sql, (err, result) => {
          if (err) {
            console.log("sql", sql);
            reject({ message: err.sqlMessage });
          }
          resolve(result);
        });
      }
    });
  }

  function getAllTutorAvailableTime() {
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `select * from tutor INNER join (select id as available_time_id, tutorId, time from available_time) as available_time on tutor.id = available_time.tutorId inner join user on tutor.id = user.id where available_time.available_time_id not in (select class_info.available_time from class_info) order by user.name ASC, available_time.time ASC`;
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

  function getTutorAvailableTime(id) {
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `select * from available_time where tutorId = ${id} order by time asc`;
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

  function getTutorById(id) {
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `select * from tutor where id = ${id}`;
      dbConnection.query(sql, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result[0]);
      });
    });
  }

  return {
    insertTutor,
    getTutorById,
    getAllTutorAvailableTime,
    bookTutor,
    getUpcomingClasses,
    insertAvailableTime,
    getTutorAvailableTime,
    getPassedClasses
  };
})();
