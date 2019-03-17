module.exports = (() => {
  const express = require("express");
  const router = express.Router();

  const { UserService } = require("../services");

  router.get("/", (req, res) => {
    // gets all user
    UserService.getAllUsers()
      .then(result => res.send(result))
      .catch(err => {
        console.error(err);
        res.send(err);
      });
  });

  router.post("/userLogin", (req, res) => {
    UserService.getUserByNameAndPassword(req.body)
      .then(result => {
        res.send(result);
      })
      .catch();
  });

  router.post("/", (req, res) => {
    UserService.insertUser(req.body)
      .then(result => {
        const message = "inserted successfully";
        res.send({ message, result });
      })
      .catch(error => {
        res.send({ error });
      });
  });

  return router;
})();
