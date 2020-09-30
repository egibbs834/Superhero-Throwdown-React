const db = require("../models");

// Defining methods for the villainsController
module.exports = {
  findAll: function (req, res) {
    db.Villains.find(req.query).then((dbModel) => res.json(dbModel));
  },
  randomizeOne: async function (req, res) {
    await db.Villains.aggregate([
      {
        $sample: { size: 1 },
      },
    ])
      .then((res) => {
        console.log("res: ", res);
        res.json(res);
      })
      .catch(console.error);
  },
};
