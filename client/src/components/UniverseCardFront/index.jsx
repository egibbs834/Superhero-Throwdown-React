import React, { useContext, Fragment, useState } from "react";
import {
  MDBBtn,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBRow,
  MDBProgress,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBLink,
  MDBContainer,
} from "mdbreact";
import "./style.css";
import FightPageHeroContext from "../../context/fightPageHeroContext";
import FightPageVillainContext from "../../context/fightPageVillainContext";
import { useSpring, animated as a } from "react-spring";

export default function UniverseCardFront({ character, increment }) {
  console.log("character: ", character);
  const { fightPageHeroContext, setFightPageHeroContext } = useContext(
    FightPageHeroContext
  );
  const { fightPageVillainContext, setFightPageVillainContext } = useContext(
    FightPageVillainContext
  );

  // creates the colors in the dropdown menu in our card
  function statBarColor(value) {
    if (value <= 50) {
      return "warning";
    } else if (value > 50 && value <= 75) {
      return "success";
    } else if (value > 75 && value <= 100) {
      return "danger";
    } else {
      return;
    }
  }

  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  console.log("flippedState: ", flipped);
  console.log(`${character.name} is flipped: ${flipped}`);

  // redirects the user to the fight page on button click
  function handleFight() {
    setFightPageHeroContext(character);
    setFightPageHeroContext({
      ...character,
      attack: Math.floor(
        character.intelligence * 1.75 + character.power + character.combat * 1.3
      ),
      totalHealth: Math.floor(
        character.durability * 2.75 +
          character.speed * 1.25 +
          character.strength
      ),
      currentHealth: Math.floor(
        character.durability * 2.75 +
          character.speed * 1.25 +
          character.strength
      ),
    });
    setFightPageVillainContext({
      ...fightPageVillainContext,
      attack: Math.floor(
        fightPageVillainContext.intel * 1.75 +
          fightPageVillainContext.power +
          fightPageVillainContext.combat * 1.3
      ),
      totalHealth: Math.floor(
        fightPageVillainContext.durability * 2.75 +
          fightPageVillainContext.speed * 1.25 +
          fightPageVillainContext.strength
      ),
      currentHealth: Math.floor(
        fightPageVillainContext.durability * 2.75 +
          fightPageVillainContext.speed * 1.25 +
          fightPageVillainContext.strength
      ),
    });
  }

  return (
    <Fragment>
      <MDBCardBody
        style={{
          maxHeight: "24rem",
          padding: "none",
          textTransform: "capitalize",
        }}
      >
        <MDBCardTitle className="align-text-center myColor">
          <strong>{character.name}</strong>
        </MDBCardTitle>
        <hr></hr>
        <div style={{ height: "10rem" }}>
          <MDBCardText className="marginBtm mt-0">
            <strong>
              Tier Ranking:{" "}
              <span className="myColor">{character.tier_list}</span>{" "}
            </strong>
          </MDBCardText>
          <MDBCardText>
            <strong>Total Power: {character.total_power}</strong>{" "}
          </MDBCardText>
          <MDBCardText className="marginBtm">
            Alignment: {character.alignment}
          </MDBCardText>
          <MDBCardText className="marginBtm">
            Race: {character.race}
          </MDBCardText>
          <MDBCardText className="marginBtm">
            Height: {character.height}
          </MDBCardText>
          <MDBCardText className="marginBtm">
            Weight: {character.weight}{" "}
          </MDBCardText>
          <MDBCardText className="">
            Publisher: <strong>{character.publisher}</strong>
          </MDBCardText>
        </div>
        <hr></hr>
        <MDBDropdown className="text-center" size="sm" hover dropup>
          <MDBDropdownToggle color="secondary">Power Stats</MDBDropdownToggle>
          <MDBDropdownMenu color="secondary" basic>
            <MDBDropdownItem>
              Combat: {character.combat}
              <MDBProgress
                className="my-2"
                material
                value={character.combat}
                color={statBarColor(parseInt(character.combat))}
              />
            </MDBDropdownItem>
            <MDBDropdownItem>
              Durability: {character.durability}
              <MDBProgress
                className="my-2"
                material
                value={character.durability}
                color={statBarColor(parseInt(character.durability))}
              />
            </MDBDropdownItem>
            <MDBDropdownItem>
              Intelligence: {character.intelligence}
              <MDBProgress
                className="my-2"
                material
                value={character.intelligence}
                color={statBarColor(parseInt(character.intelligence))}
              />
            </MDBDropdownItem>
            <MDBDropdownItem>
              Power: {character.power}
              <MDBProgress
                className="my-2"
                material
                value={character.power}
                color={statBarColor(parseInt(character.power))}
              />
            </MDBDropdownItem>
            <MDBDropdownItem>
              Speed: {character.speed}
              <MDBProgress
                className="my-2"
                material
                value={character.speed}
                color={statBarColor(parseInt(character.speed))}
              />
            </MDBDropdownItem>
            <MDBDropdownItem>
              Strength: {character.strength}
              <MDBProgress
                className="my-2"
                material
                value={character.strength}
                color={statBarColor(parseInt(character.strength))}
              />
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
        <MDBRow>
          <MDBCol className="text-center">
            <MDBLink to="/fight">
              <MDBBtn
                className="mb-1"
                color="danger"
                size="sm"
                onClick={handleFight}
              >
                Fight!
              </MDBBtn>
            </MDBLink>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </Fragment>
  );
}
