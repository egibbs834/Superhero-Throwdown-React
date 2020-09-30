const mongoose = require("mongoose");
const Villain = mongoose.model("Villain");
const villainController = require("../controllers/villainsController");

module.exports = (app) => {
  app.get("/api/villain_data", async (req, res) => {
    let randomVillain = await Villain.aggregate([
      {
        $sample: { size: 1 },
      },
    ])
      .then((randomVillain) => res.send(randomVillain))
      .catch(console.error);
  });
};
