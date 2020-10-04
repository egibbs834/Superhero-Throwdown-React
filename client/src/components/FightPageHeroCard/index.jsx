import React, { useContext, Fragment } from "react";
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
// import "./style.css";


export default function FightPageHeroCard({ hero }) {

  console.log("(FightPageHeroCard) hero: ", hero)
  const totalHeroHealth = hero.strength + hero.speed + hero.durability;
  const heroAttack = hero.intelligence + hero.power + hero.combat;
  console.log("totalHeroHealth: ", totalHeroHealth);
  console.log("heroAttack: ", heroAttack);
  var currentHeroHealth = totalHeroHealth;
  var lastAttack = 10;
  currentHeroHealth = currentHeroHealth - lastAttack;
  var healthbarValPercent = Math.floor((currentHeroHealth/totalHeroHealth)*100 )
  // console.log("(FightPageHeroCard) props: ", hero);
  // creates the colors in the dropdown menu in our card
  function statBarColor(value) {
    if (value <= 50) {
      return "danger";
    } else if (value > 50 && value <= 75) {
      return "warning";
    } else if (value > 75 && value <= 100) {
      return "success";
    } else {
      return;
    }
  }


  return (
    <Fragment>
      <MDBView hover zoom>
        <MDBCard style={{ width: "17rem" }} className="m-2">
          <MDBCardImage
            className="img-thumbnail"
            src={hero.img_url}
            style={{
              width: "100%",
              maxHeight: "338px",
            }}
            alt={`picture of ${hero.name}`}
          />
          <MDBCardBody
            style={{
              maxHeight: "24rem",
              padding: "none",
              textTransform: "capitalize",
            }}
          >
            <MDBCardTitle className="align-text-center myColor">
              <strong>{hero.name}</strong>
            </MDBCardTitle>
            <hr></hr>
            <div style={{ height: "10rem" }}>
              <MDBCardText className="marginBtm mt-0">
                <strong>
                  Tier Ranking:{" "}
                  <span className="myColor">{hero.tier_list}</span>{" "}
                </strong>
              </MDBCardText>
              <MDBCardText>
                <strong>Total Power: {hero.total_power}</strong>{" "}
              </MDBCardText>
              {/* <MDBCardText className="marginBtm">
                Alignment: {hero.alignment}
              </MDBCardText>
              <MDBCardText className="marginBtm">
                Race: {hero.race}
              </MDBCardText>
              <MDBCardText className="marginBtm">
                Height: {hero.height}
              </MDBCardText>
              <MDBCardText className="marginBtm">
                Weight: {hero.weight}{" "}
              </MDBCardText>
              <MDBCardText className="">
                Publisher: <strong>{hero.publisher}</strong>
              </MDBCardText> */}
              <MDBCardText>
                Health:
                <MDBProgress
                    className="my-2"
                    material
                    value={ healthbarValPercent }
                    color={statBarColor(parseInt(healthbarValPercent))}
                    animated>
                    { healthbarValPercent + "%"}   
                </MDBProgress>
              </MDBCardText>
            </div>
            <hr></hr>
            <MDBDropdown className="text-center" size="sm" hover dropup>
              <MDBDropdownToggle color="secondary">
                Power Stats
              </MDBDropdownToggle>
              <MDBDropdownMenu color="secondary" basic>
                <MDBDropdownItem>
                  Combat: {hero.combat}
                  <MDBProgress
                    className="my-2"
                    material
                    value={hero.combat}
                    color={statBarColor(parseInt(hero.combat))}
                  />
                </MDBDropdownItem>
                <MDBDropdownItem>
                  Durability: {hero.durability}
                  <MDBProgress
                    className="my-2"
                    material
                    value={hero.durability}
                    color={statBarColor(parseInt(hero.durability))}
                  />
                </MDBDropdownItem>
                <MDBDropdownItem>
                  Intelligence: {hero.intelligence}
                  <MDBProgress
                    className="my-2"
                    material
                    value={hero.intelligence}
                    color={statBarColor(parseInt(hero.intelligence))}
                  />
                </MDBDropdownItem>
                <MDBDropdownItem>
                  Power: {hero.power}
                  <MDBProgress
                    className="my-2"
                    material
                    value={hero.power}
                    color={statBarColor(parseInt(hero.power))}
                  />
                </MDBDropdownItem>
                <MDBDropdownItem>
                  Speed: {hero.speed}
                  <MDBProgress
                    className="my-2"
                    material
                    value={hero.speed}
                    color={statBarColor(parseInt(hero.speed))}
                  />
                </MDBDropdownItem>
                <MDBDropdownItem>
                  Strength: {hero.strength}
                  <MDBProgress
                    className="my-2"
                    material
                    value={hero.strength}
                    color={statBarColor(parseInt(hero.strength))}
                  />
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
            <MDBRow>
              <MDBCol className="text-center"> 
                <MDBLink to="/fight">
                  <MDBBtn className="mb-1" color="danger" size="sm" >
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
