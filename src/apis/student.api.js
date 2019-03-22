module.exports = (() => {
  const express = require("express");
  const router = express.Router();

  const { ForumService, StudentService } = require("../services");

  router.get("/:id/upcomingClasses", (req, res) => {
    const id = req.params.id;
    StudentService.getUpcomingClasses(id)
      .then(results => {
        res.send(results);
      })
      .catch(err => {
        console.error(err);
        res.send({ error: err });
      });
  });

  router.get("/:id/passedClassesTutors", (req, res) => {
    const id = req.params.id;
    StudentService.getPassedClassesTutors(id)
      .then(results => {
        res.send(results);
      })
      .catch(err => {
        console.error(err);
        res.send({ error: err });
      });
  });

  router.get("/:id/passedClasses", (req, res) => {
    const id = req.params.id;
    StudentService.getPassedClasses(id)
      .then(results => {
        res.send(results);
      })
      .catch(err => {
        console.error(err);
        res.send({ error: err });
      });
  });

  router.post("/:id/rateTutor", (req, res) => {
    StudentService.rateTutor(req.body)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.error(err);
        res.send({ error: err });
      });
  });

  return router;
})();
