import React, { useContext, useState } from "react";
import { MDBLink, MDBBtn } from "mdbreact";

import FightPageHeroContext from "../../context/fightPageHeroContext";
import FightPageVillainContext from "../../context/fightPageVillainContext";
import FightPageStatsCard from "../FightPageStatsCard";

function Attack() {
  const { fightPageHeroContext } = useContext(FightPageHeroContext);
  const { fightPageVillainContext, setFightPageVillainContext } = useContext(
    FightPageVillainContext
  );

  // function updateVillainContext() {
  //   setFightPageVillainContext({
  //     ...fightPageVillainContext,
  //     fightInfo: {
  //       name: fightPageVillainContext.name,
  //       attack: Math.floor(
  //         fightPageVillainContext.intel * 1.75 +
  //           fightPageVillainContext.power +
  //           fightPageVillainContext.combat * 1.3
  //       ),
  //       health: Math.floor(
  //         fightPageVillainContext.durability * 2.75 +
  //           fightPageVillainContext.speed * 1.25 +
  //           fightPageVillainContext.strength
  //       ),
  //     },
  //   });
  // }

  const [hero, setHero] = useState({
    name: fightPageHeroContext.name,
    attack: Math.floor(
      fightPageHeroContext.intelligence * 1.75 +
        fightPageHeroContext.power +
        fightPageHeroContext.combat * 1.3
    ),
    health: Math.floor(
      fightPageHeroContext.durability * 2.75 +
        fightPageHeroContext.speed * 1.25 +
        fightPageHeroContext.strength
    ),
  });
  console.log({ hero });

  const [villain, setVillain] = useState({
    name: fightPageVillainContext.name,
    attack: Math.floor(
      fightPageVillainContext.intel * 1.75 +
        fightPageVillainContext.power +
        fightPageVillainContext.combat * 1.3
    ),
    health: Math.floor(
      fightPageVillainContext.durability * 2.75 +
        fightPageVillainContext.speed * 1.25 +
        fightPageVillainContext.strength
    ),
  });
  console.log({ villain });

  const [randomAttack, setRandomAttack] = useState({
    hero: 0,
    villain: 0,
  });

  function randomizeAttack() {
    setRandomAttack({
      hero: Math.floor((Math.random() * hero.attack) / 2 + 5),
      villain: Math.floor((Math.random() * villain.attack) / 2 + 5),
    });
  }

  function handleAttack() {
    randomizeAttack();
    setVillain({
      ...villain,
      health: villain.health - randomAttack.hero,
    });
    setFightPageVillainContext({
      ...fightPageVillainContext,
      fightInfo: villain,
    });
    console.log(`handle attack ${fightPageVillainContext}`);

    setTimeout(() => {
      setHero(
        {
          ...hero,
          health: hero.health - randomAttack.villain,
        },
        500
      );
    });
    console.log({ randomAttack });
  }

  return (
    <MDBBtn className="mb-1" color="danger" size="sm" onClick={handleAttack}>
      Attack!
    </MDBBtn>
  );
}

export default Attack;
