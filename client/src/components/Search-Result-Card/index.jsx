import React, { useState } from "react";
import {
  MDBView,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBProgress,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";
import "./index.css";
<<<<<<< HEAD
import API from "../../utils/API";
=======
import Axios from "axios";
import API from "../../utils/API";

>>>>>>> e2a2a660676c780cdcec2ba3a2ea3ada213fdd78
const ResultCard = (props) => {
  console.log("(ResultCard) props: ", props);

  const [addTo, setAddTo] = useState({});
  console.log("addTo: ", addTo);

  function addHeroToDatabase(character) {
    console.log("MyCharacter: ", character);
    if (
      window.confirm(
        `Are you sure you want to add ${character.name} to the DB?`
      )
    ) {
      console.log("Wonderful news!");
      API.addHero(character).then((res) => {
        console.log("Successfully added hero to database: ", res);
      });
    }
  }

  function statBarColor(value) {
    // console.log("value: ", typeof value);
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

  function addHeroToDatabase(character) {
    console.log("MyCharacter: ", character);
    if (window.confirm(`Are you sure you want to add ${character.name} to the DB?`)) {

      console.log("Wonderful news!")
      API.addHero(character).then((res) => {
        console.log("Successfully added hero to database: ", res);
      })

    }
  }
  // console.log(statBarColor());
  function tierList(value) {
    if (value <= 100) {
      return "F";
    } else if (value > 100 && value <= 200) {
      return "D";
    } else if (value > 200 && value <= 300) {
      return "C";
    } else if (value > 300 && value <= 400) {
      return "B";
    } else if (value > 400 && value <= 500) {
      return "A";
    } else if (value > 500 && value < 600) {
      return "S";
    } else if (value === 600) {
      return "GOD";
    } else {
      return;
    }
  }
  return (
    <MDBCol className="justify-content-center align-items-center text-center container-fluid">
      {props.characters.length ? (
        <div className="row justify-content-center align-items-center container-fluid">
          {props.characters.map((character, i) => {
            // console.log("character in map: ", character);
            return (
              <MDBView hover zoom key={i}>
                <MDBCard style={{ width: "16rem" }} className="m-2">
                  <MDBCardImage
                    className="img-thumbnail"
                    src={character.img}
                    style={{
                      width: "100%",
                      maxHeight: "338px",
                    }}
                    alt={`picture of ${character.name}`}
                  />
                  <MDBCardBody
                    style={{
                      height: "24rem",
                      padding: "none",
                      textTransform: "capitalize",
                    }}
                  >
                    <MDBCardTitle className="align-text-center myColor">
                      <strong>{character.name}</strong>
                    </MDBCardTitle>
                    <hr></hr>
                    <div fluid style={{ height: "10rem" }}>
                      <MDBCardText className="marginBtm mt-0">
                        <strong>Tier Ranking: </strong>
                        <strong>
                          <span className="myColor">
                            {tierList(
                              parseInt(character.combat) +
                                parseInt(character.durability) +
                                parseInt(character.intelligence) +
                                parseInt(character.power) +
                                parseInt(character.speed) +
                                parseInt(character.strength)
                            )}
                          </span>
                        </strong>
                      </MDBCardText>
                      <MDBCardText>
                        <strong>
                          Total Power:{" "}
                          {parseInt(character.combat) +
                            parseInt(character.durability) +
                            parseInt(character.intelligence) +
                            parseInt(character.power) +
                            parseInt(character.speed) +
                            parseInt(character.strength)}
                        </strong>{" "}
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
                    <MDBDropdown className="text-center" size="sm" hover>
                      <MDBDropdownToggle color="secondary">
                        Power Stats
                      </MDBDropdownToggle>
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
                            color={statBarColor(
                              parseInt(character.intelligence)
                            )}
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
                    <div className="row">
<<<<<<< HEAD
                      <MDBBtn className="ml-auto" color="white" size="sm" value={character} onClick={() => addHeroToDatabase(character)}>
=======
                      <MDBBtn
                        onClick={() => addHeroToDatabase(character)}
                        className="ml-auto"
                        color="white"
                        size="sm"
                        value={character}
                      >
>>>>>>> e2a2a660676c780cdcec2ba3a2ea3ada213fdd78
                        Add To
                      </MDBBtn>
                      <MDBBtn className="mr-auto" color="white" size="sm">
                        More Info
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBView>
            );
          })}
        </div>
      ) : (
        <h3>No Searches Yet</h3>
      )}
    </MDBCol>
  );
};
export default ResultCard;
