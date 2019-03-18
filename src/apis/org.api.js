module.exports = (() => {
  const express = require("express");
  const router = express.Router();

  const { OrgService } = require("../services");

  router.get("/performance", (req, res) => {
    OrgService.getAllPerformance()
      .then(results => {
        // combine instrument with same performance id
        let combineInstrument = {};
        results.map(result => {
          if (combineInstrument[result.id]) {
            combineInstrument[result.id].instrument =
              combineInstrument[result.id].instrument +
              ", " +
              result.instrument;
          } else {
            // if no missing instruments
            if (!result.instrument) {
              result.instrument = "none";
            }
            combineInstrument[result.id] = result;
          }
        });
        return combineInstrument;
      })
      .then(combineInstrument => {
        // transform into array
        let results = [];
        Object.keys(combineInstrument).forEach((value, index, arr) => {
          results.push(combineInstrument[value]);
        });
        return results;
      })
      .then(results => {
        results.sort((a, b) => {
          return -1 * (new Date(b.time) - new Date(a.time));
        });
        res.send(results);
      })
      .catch(error => res.send({ error }));
  });

  router.get("/:id/performance", (req, res) => {
    const id = req.params.id;
    OrgService.getPerformance(id)
      .then(results => {
        // combine instrument with same performance id
        let combineInstrument = {};
        results.map(result => {
          if (combineInstrument[result.id]) {
            combineInstrument[result.id].instrument =
              combineInstrument[result.id].instrument +
              ", " +
              result.instrument;
          } else {
            if (!result.instrument) {
              result.instrument = "none";
            }
            combineInstrument[result.id] = result;
          }
        });
        return combineInstrument;
      })
      .then(combineInstrument => {
        // transform into array
        let results = [];
        Object.keys(combineInstrument).forEach((value, index, arr) => {
          results.push(combineInstrument[value]);
        });
        return results;
      })
      .then(results => {
        results.sort((a, b) => {
          return -1 * (new Date(b.time) - new Date(a.time));
        });
        res.send(results);
      })
      .catch(error => res.send({ error }));
  });

  router.post("/:id/performance", (req, res) => {
    const id = req.params.id;
    OrgService.insertPerformance(id, req.body)
      .then(result => {
        res.send(result);
      })
      .catch(error => res.send({ error }));
  });

  return router;
})();
