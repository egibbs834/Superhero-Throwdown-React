const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/reactsuperhero"
  );

  const villainSeed = [
      {
        name: "Lex Luthor",
        hero_id: 405,
        intel: 100,
        strength: 53,
        speed: 25,
        durability: 65,
        power: 68,
        combat: 70,
        total_power: 381,
        alignment: "bad",
        img_url: "https://www.superherodb.com/pictures2/portraits/10/100/727.jpg",
        date: new Date(Date.now())
      },
      {
        name: "Doctor Doom",
        hero_id: 222,
        intel: 100,
        strength: 32,
        speed: 20,
        durability: 100,
        power: 100,
        combat: 84,
        total_power: 436,
        alignment: "bad",
        img_url: "https://www.superherodb.com/pictures2/portraits/10/100/189.jpg",
        date: new Date(Date.now())
      },
      {
        name: "Mister Freeze",
        hero_id: 457,
        intel: 75,
        strength: 32,
        speed: 12,
        durability: 70,
        power: 37,
        combat: 28,
        total_power: 254,
        alignment: "bad",
        img_url: "https://www.superherodb.com/pictures2/portraits/10/100/742.jpg",
        date: new Date(Date.now())
      }
  ];

  db.Villains
  .remove({})
  .then(() => db.Villains.collection.insertMany(villainSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });