const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const villainSchema = new Schema({
  name: { type: String, required: true, unique: true },
  hero_id: { type: Number, unique: true },
  intel: { type: Number, required: true },
  strength: { type: Number, required: true },
  speed: { type: Number, required: true },
  durability: { type: Number, required: true },
  power: { type: Number, required: true },
  combat: { type: Number, required: true },
  total_power: { type: Number, required: true },
  alignment: { type: String, required: true },
  img_url: { type: String, required: true},
  
});

const Villain = mongoose.model("Villain", villainSchema);

module.exports = Villain;
