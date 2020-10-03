import React, { Fragment } from "react";
import { Route} from "react-router-dom";
import {
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
  MDBLink
} from "mdbreact";
import "./style.css";
export default function UniverseCardFront({ character, increment }) {
  console.log("(UniverseCardFront) props: ", character);
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

  // redirects the user to the fight page on button click
  function handleFight() {
    console.log("Launching Fight Page");
  // setUsername("");
    // setHeroContext({});
    // API.handleLogout()
    //   .then((res) => {
    //     console.log("user logged out");
    //   })
    //   .catch(console.error);
  }

  return (
    <Fragment>
      <MDBView hover zoom key={increment}>
        <MDBCard style={{ width: "17rem" }} className="m-2">
          <MDBCardImage
            className="img-thumbnail"
            src={character.img_url}
            style={{
              width: "100%",
              maxHeight: "338px",
            }}
            alt={`picture of ${character.name}`}
          />
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
            <div fluid style={{ height: "10rem" }}>
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
                  <MDBBtn className="mb-1" color="danger" size="sm" onClick={handleFight}>
                  Fight!</MDBBtn>
                </MDBLink>  
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBView>
    </Fragment>
  );
}
