module.exports = (() => {
  const DbService = require("./db.service.js");

  function getAllPerformance() {
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `select * from performance_info inner join (select id as organizationId, orgName, orgPhone from organization) as organization on performance_info.organizationId = organization.organizationId inner join (select id as organization_performance_instrument_id, organizationId, performanceId, instrument from organization_performance_instrument) as organization_performance_instrument on organization_performance_instrument.performanceId = performance_info.id WHERE performance_info.time >= now() order by performance_info.time asc`;
      dbConnection.query(sql, (err, result) => {
        if (err) {
          console.error(err);
          reject({
            message: err.sqlMessage
          });
          return;
        }
        resolve(result);
      });
    });
  }

  function getPerformance(id) {
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `select * from performance_info inner join (select id as orgId, orgName, orgPhone from organization) as organization on performance_info.organizationId = organization.orgId left join (select id as organization_performance_instrument_id, instrument, organizationId, performanceId from organization_performance_instrument) as organization_performance_instrument on performance_info.id = organization_performance_instrument.performanceId where performance_info.organizationId=${id} AND performance_info.time >= now() order by performance_info.time asc`;
      dbConnection.query(sql, (err, result) => {
        if (err) {
          console.error(err);
          reject({
            message: err.sqlMessage
          });
          return;
        }
        resolve(result);
      });
    });
  }

  function getOldPerformance(id) {
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `select * from performance_info inner join (select id as orgId, orgName, orgPhone from organization) as organization on performance_info.organizationId = organization.orgId left join (select id as organization_performance_instrument_id, instrument, organizationId, performanceId from organization_performance_instrument) as organization_performance_instrument on performance_info.id = organization_performance_instrument.performanceId where performance_info.organizationId=${id} AND performance_info.time <= now() order by performance_info.time asc`;
      dbConnection.query(sql, (err, result) => {
        if (err) {
          console.error(err);
          reject({
            message: err.sqlMessage
          });
          return;
        }
        resolve(result);
      });
    });
  }

  function insertPerformance(orgId, reqBody) {
    const { location, time, instruments, name } = reqBody;
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `insert into performance_info (organizationid, location, time, name) values (${orgId},"${location}", "${time}", "${name}")`;
      dbConnection.query(sql, (err, result) => {
        if (err) {
          console.error(err);
          reject({
            message: err.sqlMessage
          });
          return;
        }
        const performanceId = result.insertId;

        let performanceInstruments = instruments.map(instrument =>
          insertPerformanceInstrument(orgId, performanceId, instrument)
        );

        Promise.all(performanceInstruments)
          .then(result => {
            resolve(result);
          })
          .catch(err => {
            console.error(err);
            reject(err);
          });
      });
    });
  }

  function insertPerformanceInstrument(orgId, performanceId, instrument) {
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `insert into organization_performance_instrument (organizationId, performanceId, instrument) values (${orgId},${performanceId},"${instrument}")`;
      dbConnection.query(sql, (err, result) => {
        if (err) {
          console.error(err);
          reject({
            message: err.sqlMessage
          });
          return;
        }
        resolve(result);
      });
    });
  }

  function insertOrganization(reqBody) {
    const { userId, orgName, orgPhone } = reqBody;
    return new Promise((resolve, reject) => {
      const dbConnection = DbService.getConnection();
      const sql = `insert into organization (id, orgName, orgPhone) values (${userId},"${orgName}", ${orgPhone})`;
      dbConnection.query(sql, (err, result) => {
        if (err) {
          console.error(err);
          reject({
            message: sqlMessage
          });
          return;
        }
        resolve(result);
      });
    });
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

  return {
    insertOrganization,
    getOrganizationById,
    insertPerformance,
    getPerformance,
    getAllPerformance,
    getOldPerformance
  };
})();
