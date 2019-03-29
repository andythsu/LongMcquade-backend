module.exports = (() => {
  const express = require("express");
  const router = express.Router();

  const { TutorService } = require("../services");

  // get all tutor available time
  router.get("/availableTime", (req, res) => {
    TutorService.getAllTutorAvailableTime()
      .then(results => {
        res.send(results);
      })
      .catch();
  });

  // get current tutor available time
  router.get("/:id/availableTime", (req, res) => {
    const id = req.params.id;
    TutorService.getTutorAvailableTime(id)
      .then(results => {
        res.send(results);
      })
      .catch();
  });

  router.get("/:id/rate", (req, res) => {
    const id = req.params.id;
    TutorService.getRate(id)
      .then(results => {
        const rate = results[0].avg_rate;
        res.send({ rate });
      })
      .catch();
  });

  router.post("/availableTime", (req, res) => {
    TutorService.insertAvailableTime(req.body)
      .then(results => {
        res.send(results);
      })
      .catch(error => {
        res.send({ error });
      });
  });

  router.get("/:id/upcomingClasses", (req, res) => {
    const id = req.params.id;
    TutorService.getUpcomingClasses(id)
      .then(results => {
        res.send(results);
      })
      .catch(error => {
        res.send({ error });
      });
  });

  router.get("/:id/passedClasses", (req, res) => {
    const id = req.params.id;
    TutorService.getPassedClasses(id)
      .then(results => {
        res.send(results);
      })
      .catch(error => {
        res.send({ error });
      });
  });

  router.post("/book", (req, res) => {
    TutorService.bookTutor(req.body)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.send({ error: err });
        console.error(err);
      });
  });

  return router;
})();
