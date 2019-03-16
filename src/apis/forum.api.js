module.exports = (() => {
  const express = require("express");
  const router = express.Router();

  const { ForumService } = require("../services");

  router.get("/", (req, res) => {
    ForumService.getAllForums()
      .then(result => {
        res.send(result);
      })
      .catch();
  });

  router.post("/", (req, res) => {
    ForumService.insertForum(req.body)
      .then(result => {
        res.send(result);
      })
      .catch(error => {
        res.send({ error });
      });
  });

  return router;
})();
