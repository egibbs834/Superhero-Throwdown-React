const mongoose = require("mongoose");
// const Hero = mongoose.model("Hero");
const Hero = require("../models/heroes")
// const Heroes = require("../models")

module.exports = (app) => {

    // app.post("/api/hero_data", (req, res) => {
    //     console.log("req.body for addHero: ", req.body);
    //     const newHero = 
    //     Hero.insertOne({
    //         img: req.body.img,
    //         name: req.body.name,
    //         publisher: req.body.publisher,
    //         alignment: req.body.alignment,
    //         race: req.body.race,
    //         height: req.body.height,
    //         weight: req.body.weight,
    //         combat: req.body.combat,
    //         durability: req.body.durability,
    //         intelligence: req.body.intelligence,
    //         power: req.body.power,
    //         speed: req.body.speed,
    //         strength: req.body.strength
    //     })
    //         .then((newHero) => {
    //             console.log("newHero: ", newHero)
    //             res.send(newHero)
    //         }) 
    //         .catch(err => res.status(422).json(err));
    //     // res.send("Succesfully Authenticated");
    // })
    app.post("/api/hero_data", (req, res) => {
        console.log("req.body heroData: ", req.body);
        Hero.findOne({ name: req.body.name }, async (err, doc) => {
          if (err) {
            throw err;
          }
          if (doc) {
            console.log("doc: ", doc);
            res.send("hero Already Exists");
          }
          if (!doc) {
              console.log("Created new hero");
            //   res.send("Succesfully Created");
              const newHero = new Hero({
                img: req.body.img,
                name: req.body.name,
                publisher: req.body.publisher,
                alignment: req.body.alignment,
                race: req.body.race,
                height: req.body.height,
                weight: req.body.weight,
                combat: req.body.combat,
                durability: req.body.durability,
                intelligence: req.body.intelligence,
                power: req.body.power,
                speed: req.body.speed,
                strength: req.body.strength
              });
              await newHero.save()
                .then(console.log("We created our new hero: ", newHero))
                .catch((err) => {
                    console.log("Oops there was a problem");
                res.send(err);
              });
            
          }
        });
      });

}

