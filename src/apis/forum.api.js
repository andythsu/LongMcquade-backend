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

  return router;
})();
