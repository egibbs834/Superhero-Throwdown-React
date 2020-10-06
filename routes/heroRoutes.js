const axios = require('axios');
const mongoose = require("mongoose");

const Hero = require("../models/heroes");

module.exports = (app) => {
  app.post("/api/hero_data", (req, res) => {
    console.log("post /api/hero_data");
    console.log("req.body: ", req.body);
    Hero.findOne(
      {
        hero_id: req.body.character.heroID,
        createdBy: req.body.username,
      },
      async (err, doc) => {
        if (err) {
          throw err;
        }
        if (doc) {
          console.log(`${req.body.character.name} already exists in db `, doc);
          res.send(
            `${req.body.character.name} already exists in your universe!`
          );
        }
        if (!doc) {
          const newHero = new Hero({
            img_url: req.body.character.img,
            name: req.body.character.name,
            hero_id: req.body.character.heroID,
            publisher: req.body.character.publisher,
            alignment: req.body.character.alignment,
            race: req.body.character.race,
            height: req.body.character.height,
            weight: req.body.character.weight,
            tier_list: req.body.character.tierList,
            total_power: req.body.character.totalPower,
            combat: req.body.character.combat,
            durability: req.body.character.durability,
            intelligence: req.body.character.intelligence,
            power: req.body.character.power,
            speed: req.body.character.speed,
            strength: req.body.character.strength,
            createdBy: req.body.username,
          });
          console.log(
            `${req.body.character.name} has been created and added to db`
          );
          await newHero
            .save()
            .then(
              res.send(
                `${req.body.character.name} has been added to your universe!`
              )
            )
            .catch(console.error);
        }
      }
    );
  }),

  app.get("/api/universe/:username", (req, res) => {
    console.log("username in heroRoutes: ", req.params.username);
    Hero.find({ createdBy: req.params.username } ).then((result) => {
      console.log("result: ", result)
      res.send(result);
    });
  });
  app.get("/api/superhero/:hero", (req, res) => {
    axios.get(
      `https://superheroapi.com/api/${process.env.API_KEY}/search/${req.params.hero}`
    ).then(superHeroResp=>{
      res.json(superHeroResp.data)
    }).catch(err=>{
      res.json(err);
    });
  });
  app.get("/api/comicvine/:hero", (req, res) => {
    axios.get(
      `https://comicvine.gamespot.com/api/characters/?api_key=${process.env.APICV_KEY}&format=json&filter=name:${req.params.hero}`
    ).then(superHeroIDResp=>{
      let match = superHeroIDResp.data.results.filter(character=>character.name.length === req.params.hero.length);
          match.length > 0 && axios.get(
        `https://comicvine.gamespot.com/api/character/4005-${match[0].id}/?api_key=${process.env.APICV_KEY}&format=json`
      ).then(superHeroResp=>{
          res.json(superHeroResp.data);
    })
    });
  });
};
