import React, { useContext, useState } from "react";
import API from "../../utils/API";
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
  MDBContainer,
} from "mdbreact";
import "./index.css";

import UsernameContext from "../../context/usernameContext";
import HeroContext from "../../context/heroContext";
import AddHeroModal from "../Modal/index";

const ResultCard = ({character}) => {
  console.log("(ResultCard) props: ", character);
  const[moreInfo,setMoreInfo] = useState(null);

  const { username } = useContext(UsernameContext);
  const { heroContext, setHeroContext } = useContext(HeroContext);
  console.log("heroContext: ", heroContext);

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

function getMoreInfo(name, i){
  API.getSuperheroID(name)
        .then((res2) => {
          console.log(res2)
          const match = res2.data.results.filter(character=>character.name.length === name.length)
          console.log(match)
          match.length > 0 && API.getMoreInfo(match[0].id)
          .then((res3) => {
          console.log("res3:", res3);
          setMoreInfo(res3.data.results);
        
      })
    })
}

moreInfo && console.log(moreInfo)
  // function handleMoreInfo(character) {
  //   console.log({ character });
  //   setHeroContext(character);
  // }
  return (
              <MDBView hover zoom>
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
                      height: "28rem",
                      padding: "none",
                      textTransform: "capitalize",
                    }}
                  >
                    <MDBCardTitle className="align-text-center myColor">
                      <strong>{character.name}</strong>
                    </MDBCardTitle>
                    <hr></hr>
                    <div fluid style={{ height: "11rem" }}>
                      <MDBCardText className="marginBtm mt-0">
                        <strong>
                          Tier Ranking:{" "}
                          <span className="myColor">{character.tierList}</span>{" "}
                        </strong>
                      </MDBCardText>
                      <MDBCardText>
                        <strong>Total Power: {character.totalPower}</strong>{" "}
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
                      <AddHeroModal character={character} username={username} />
                    </div>
                    <div className="row">
                      <MDBContainer>
                        <MDBBtn
                          className="text-white"
                          color="secondary"
                          size="sm"
                          // onClick={() => handleMoreInfo(character)}
                          onClick={() => getMoreInfo(character.name)}
                          href="#chart"
                        >
                          More Info
                        </MDBBtn>
                      </MDBContainer>
                    </div>
                    {moreInfo && <h5>Real Name</h5>}
                      {moreInfo && moreInfo.character_enemies.slice(0,4).map((enemy, i) =>(
                        <p key={i}>{enemy.name}
                        </p>
                      ))}
                  </MDBCardBody>
                </MDBCard>
              </MDBView>      
  );
};
export default ResultCard;
