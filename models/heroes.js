const mongoose = require("mongoose");

const hero = new mongoose.Schema({
  img_url: { type: String },
  name: { type: String },
  hero_id: { type: Number },
  publisher: { type: String },
  alignment: { type: String },
  race: { type: String },
  height: { type: String },
  weight: { type: String },
  tier_list: { type: String },
  total_power: { type: Number },
  combat: { type: Number },
  durability: { type: Number },
  intelligence: { type: Number },
  power: { type: Number },
  speed: { type: Number },
  strength: { type: Number },
  createdBy: { type: String, required: true },
});
module.exports = mongoose.model("Hero", hero);
