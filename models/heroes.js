const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const hero = new mongoose.Schema({
  name: { type: String },
  intel: { type: Number },
  strength: { type: Number },
  speed: { type: Number },
  durability: { type: Number },
  power: { type: Number },
  combat: { type: Number },
  total_power: { type: Number },
  alignment: { type: String },
  height: { type: String },
  weight: { type: String },
  race: { type: String },
  publisher: { type: String },
  //   tier_ranking: { type: String },
  img_url: { type: String },
  //   createdBy: { type: String, required: true }
});
module.exports = mongoose.model("Hero", hero);
