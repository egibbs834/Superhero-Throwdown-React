import React, { useContext, Fragment, useState } from "react";
import { Route } from "react-router-dom";
import {
  MDBContainer,
  MDBView,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
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
} from "mdbreact";
import "./style.css";
import FightPageHeroContext from "../../context/fightPageHeroContext";
import { useSpring, animated as a } from "react-spring";

export default function UniverseCardBack({ character }) {
  console.log("(UniverseCardBack) character: ", character);
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
        {/* <MDBContainer> */}
          <MDBRow className="justify-content-around align-items-center text-center">
            <div style={{ height: "10rem" }}>
              <MDBCardText>
                Combat: {character.combat}
                <MDBProgress
                  className="my-2"
                  material
                  value={character.combat}
                  color={statBarColor(parseInt(character.combat))}
                />
              </MDBCardText>
              <MDBCardText>
                Durability: {character.durability}
                <MDBProgress
                  className="my-2"
                  material
                  value={character.durability}
                  color={statBarColor(parseInt(character.durability))}
                />
              </MDBCardText>
              <MDBCardText>
                Intelligence: {character.intelligence}
                <MDBProgress
                  className="my-2"
                  material
                  value={character.intelligence}
                  color={statBarColor(parseInt(character.intelligence))}
                />
              </MDBCardText>
            </div>
            <div style={{ height: "10rem" }}>
              <MDBCardText>
                Power: {character.power}
                <MDBProgress
                  className="my-2"
                  material
                  value={character.power}
                  color={statBarColor(parseInt(character.power))}
                />
              </MDBCardText>
              <MDBCardText>
                Speed: {character.speed}
                <MDBProgress
                  className="my-2"
                  material
                  value={character.speed}
                  color={statBarColor(parseInt(character.speed))}
                />
              </MDBCardText>
              <MDBCardText>
                Strength: {character.strength}
                <MDBProgress
                  className="my-2"
                  material
                  value={character.strength}
                  color={statBarColor(parseInt(character.strength))}
                />
              </MDBCardText>
            </div>
          </MDBRow>
        {/* </MDBContainer> */}

        <MDBRow>
          <MDBCol className="text-center">
            {/* <MDBLink to="/fight">
              <MDBBtn className="mb-1" color="danger" size="sm">
                Fight!
              </MDBBtn>
            </MDBLink> */}
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </Fragment>
  );
}
