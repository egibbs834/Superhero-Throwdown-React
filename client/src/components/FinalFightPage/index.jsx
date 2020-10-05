import React, { Fragment, useContext, useState, useEffect } from "react";

import {
  MDBCard,
  MDBView,
  MDBAnimation,
  MDBBtn,
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
  MDBJumbotron,
} from "mdbreact";

import FightPageHeroContext from "../../context/fightPageHeroContext";
import FightPageVillainContext from "../../context/fightPageVillainContext";
import HeroContext from "../../context/heroContext";

import tempImg from "../../pages/Fight/images/conflictEarthImg.jpg";
import winPic from "./img/universe_saved_message_pic.jpg";
import lossPic from "./img/universe_defeated_message_pic.jpg";

function FinalFightPage() {
  const { fightPageHeroContext, setFightPageHeroContext } = useContext(
    FightPageHeroContext
  );
  const { fightPageVillainContext, setFightPageVillainContext } = useContext(
    FightPageVillainContext
  );
  const { heroContext, setHeroContext } = useContext(HeroContext);

  console.log({ fightPageHeroContext, fightPageVillainContext });

  const [show, setShow] = useState(false);

  function readyFighters() {
    setShow(true);
  }

  const totalHeroHealth = fightPageHeroContext.totalHealth;
  console.log({ totalHeroHealth });
  var heroCurrentHealth = fightPageHeroContext.currentHealth;
  console.log({ heroCurrentHealth });

  const totalVillainHealth = fightPageVillainContext.totalHealth;
  console.log({ totalVillainHealth });
  var villainCurrentHealth = fightPageVillainContext.currentHealth;
  console.log({ villainCurrentHealth });

  const heroAttack = fightPageHeroContext.attack;
  console.log({ heroAttack });

  const villainAttack = fightPageVillainContext.attack;
  console.log({ villainAttack });

  const [randomHeroAttack, setRandomHeroAttack] = useState();
  const [randomVillainAttack, setRandomVillainAttack] = useState();

  function handleAttack() {
    setShow(false);
    // attacks villain
    var randomHeroAttackValue = Math.floor((Math.random() * heroAttack) / 2);
    console.log({ randomHeroAttackValue });
    villainCurrentHealth -= randomHeroAttackValue;
    console.log({ villainCurrentHealth });
    setFightPageVillainContext({
      ...fightPageVillainContext,
      currentHealth: villainCurrentHealth,
    });
    setRandomHeroAttack(randomHeroAttackValue);

    if (villainCurrentHealth > 0) {
      setTimeout(() => {
        var randomVillainAttackValue = Math.floor(
          (Math.random() * villainAttack) / 2
        );
        console.log({ randomVillainAttackValue });
        heroCurrentHealth -= randomVillainAttackValue;
        console.log({ heroCurrentHealth });
        setFightPageHeroContext({
          ...fightPageHeroContext,
          currentHealth: heroCurrentHealth,
        });
        setRandomVillainAttack(randomVillainAttackValue);
        setShow(true);
      }, 2000);
    } else {
      return;
    }
  }

  function resetVillainContext() {
    setFightPageVillainContext({});
    setFightPageHeroContext({});
    setHeroContext({});
  }

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
    <>
      <MDBRow>
        <MDBCol>
          <MDBJumbotron className="text-white" style={{ background: "none" }}>
            <h1 className="text-center display-4">
              Welcome to the Battlegrounds...
            </h1>
            <MDBCard>
              <MDBCardBody className="secondary-color">
                <MDBCardText className="text-center text-white lead">{`Welcome to the fight to save the universe. ${fightPageVillainContext.name} has been preparing to take over the universe and you have choosen ${fightPageHeroContext.name} to stop them. Below you will find out if you have succesfully done your job. Your total attack power is a combination of characters intelligence, power, and combat - with a 1.75x buff to intelligence and a 1.3x buff to combat. The total health is durability, speed, and strength - with a 2.75x buff to durability and a 1.25x buff to speed.`}</MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBJumbotron>
        </MDBCol>
      </MDBRow>
      <MDBRow
        className="justify-content-around align-items-center  mx-5"
        style={{ marginTop: "10vh" }}
      >
        {/* Hero Card */}
        <MDBAnimation type="fadeInLeft" delay="2s">
          <Fragment>
            <MDBView hover zoom>
              <MDBCard style={{ width: "17rem" }} className="m-2">
                <MDBCardImage
                  className="img-thumbnail"
                  src={fightPageHeroContext.img_url}
                  style={{
                    width: "100%",
                    maxHeight: "338px",
                  }}
                  alt={`picture of ${fightPageHeroContext.name}`}
                />
                <MDBCardBody
                  style={{
                    minHeight: "24rem",
                    padding: "none",
                    textTransform: "capitalize",
                  }}
                >
                  <MDBCardTitle className="align-text-center myColor">
                    <strong>{fightPageHeroContext.name}</strong>
                  </MDBCardTitle>
                  <hr></hr>
                  <div style={{ height: "10rem" }}>
                    <MDBCardText className="marginBtm mt-0">
                      <strong>
                        Tier Ranking:{" "}
                        <span className="myColor">
                          {fightPageHeroContext.tier_list}
                        </span>{" "}
                      </strong>
                    </MDBCardText>
                    <MDBCardText>
                      <strong>
                        Total Power: {fightPageHeroContext.total_power}
                      </strong>{" "}
                    </MDBCardText>
                    <MDBCardText>
                      <strong>
                        Total Attack: {fightPageHeroContext.attack}
                      </strong>{" "}
                    </MDBCardText>
                    <MDBCardText>
                      <strong>
                        Total Health: {fightPageHeroContext.totalHealth}
                      </strong>{" "}
                    </MDBCardText>
                    <MDBCardText>
                      Health:
                      {heroCurrentHealth > 0 ? (
                        <MDBProgress
                          className="my-2"
                          material
                          value={Math.floor(
                            (fightPageHeroContext.currentHealth /
                              fightPageHeroContext.totalHealth) *
                              100
                          )}
                          color={statBarColor(
                            parseInt(
                              Math.floor(
                                (fightPageHeroContext.currentHealth /
                                  fightPageHeroContext.totalHealth) *
                                  100
                              )
                            )
                          )}
                          animated
                        >
                          {Math.floor(
                            (fightPageHeroContext.currentHealth /
                              fightPageHeroContext.totalHealth) *
                              100
                          ) + "%"}
                        </MDBProgress>
                      ) : (
                        <MDBProgress
                          className="my-2"
                          material
                          value={0}
                          animated
                        >
                          0
                        </MDBProgress>
                      )}
                    </MDBCardText>
                  </div>
                  <hr></hr>
                  <MDBDropdown className="text-center" size="sm" hover dropup>
                    <MDBDropdownToggle color="secondary">
                      Power Stats
                    </MDBDropdownToggle>
                    <MDBDropdownMenu color="secondary" basic>
                      <MDBDropdownItem>
                        Combat: {fightPageHeroContext.combat}
                        <MDBProgress
                          className="my-2"
                          material
                          value={fightPageHeroContext.combat}
                          color={statBarColor(
                            parseInt(fightPageHeroContext.combat)
                          )}
                        />
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        Durability: {fightPageHeroContext.durability}
                        <MDBProgress
                          className="my-2"
                          material
                          value={fightPageHeroContext.durability}
                          color={statBarColor(
                            parseInt(fightPageHeroContext.durability)
                          )}
                        />
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        Intelligence: {fightPageHeroContext.intelligence}
                        <MDBProgress
                          className="my-2"
                          material
                          value={fightPageHeroContext.intelligence}
                          color={statBarColor(
                            parseInt(fightPageHeroContext.intelligence)
                          )}
                        />
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        Power: {fightPageHeroContext.power}
                        <MDBProgress
                          className="my-2"
                          material
                          value={fightPageHeroContext.power}
                          color={statBarColor(
                            parseInt(fightPageHeroContext.power)
                          )}
                        />
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        Speed: {fightPageHeroContext.speed}
                        <MDBProgress
                          className="my-2"
                          material
                          value={fightPageHeroContext.speed}
                          color={statBarColor(
                            parseInt(fightPageHeroContext.speed)
                          )}
                        />
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        Strength: {fightPageHeroContext.strength}
                        <MDBProgress
                          className="my-2"
                          material
                          value={fightPageHeroContext.strength}
                          color={statBarColor(
                            parseInt(fightPageHeroContext.strength)
                          )}
                        />
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                  <MDBRow className="justify-content-center">
                    <MDBCol className="text-center">
                      {fightPageHeroContext.currentHealth > 0 &&
                      fightPageVillainContext.currentHealth > 0 ? (
                        <MDBBtn
                          className="mb-1"
                          color="danger"
                          size="sm"
                          onClick={handleAttack}
                          style={{ display: show ? "block" : "none" }}
                        >
                          Attack!
                        </MDBBtn>
                      ) : (
                        <div></div>
                      )}
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBView>
          </Fragment>
          );
        </MDBAnimation>
        {/* Fight Stats Card */}
        <MDBAnimation type="fadeInDown" delay="3s" duration="2s">
          <Fragment>
            <MDBView hover zoom>
              <MDBCard style={{ width: "17rem" }} className="m-2">
                {heroCurrentHealth > 0 && villainCurrentHealth <= 0 ? (
                  <MDBCardImage
                    className="img-thumbnail"
                    src={winPic}
                    style={{
                      width: "100%",
                      maxHeight: "338px",
                    }}
                  />
                ) : (
                  <></>
                )}
                {villainCurrentHealth > 0 && heroCurrentHealth <= 0 ? (
                  <MDBCardImage
                    className="img-thumbnail"
                    src={lossPic}
                    style={{
                      width: "100%",
                      maxHeight: "338px",
                    }}
                  />
                ) : (
                  <></>
                )}
                {heroCurrentHealth > 0 && villainCurrentHealth > 0 ? (
                  <MDBCardImage
                    className="img-thumbnail"
                    src={tempImg}
                    style={{
                      width: "100%",
                      maxHeight: "338px",
                    }}
                  />
                ) : (
                  <></>
                )}

                <MDBCardBody
                  style={{
                    maxHeight: "27rem",
                    padding: "none",
                    textTransform: "capitalize",
                  }}
                >
                  <MDBCardTitle className="text-center myColor">
                    <strong>A Fight to Save the Universe</strong>
                  </MDBCardTitle>
                  <hr></hr>

                  <MDBCardBody
                    className="text-center"
                    style={{ height: "12rem" }}
                  >
                    {heroCurrentHealth < 0 || !randomHeroAttack ? (
                      <></>
                    ) : (
                      <>
                        <MDBCardText>
                          <strong>{fightPageHeroContext.name}</strong> attacked
                          and hit for <strong>{randomHeroAttack}</strong>
                          {" damage! "}
                        </MDBCardText>
                      </>
                    )}
                    {villainCurrentHealth < 0 || !randomVillainAttack ? (
                      <></>
                    ) : (
                      <MDBCardText>
                        <strong>{fightPageVillainContext.name}</strong> attacked
                        and hit for <strong>{randomVillainAttack}</strong>
                        {" damage! "}
                      </MDBCardText>
                    )}
                    {heroCurrentHealth > 0 && villainCurrentHealth <= 0 ? (
                      <MDBCardText>
                        <strong>
                          {fightPageHeroContext.name}
                          {
                            " is VICTORIOUS! YOU HAVE SAVED THE UNIVERSE! Rejoin the rest of your team and prepare, for the next villain is approaching..."
                          }
                        </strong>
                      </MDBCardText>
                    ) : (
                      <></>
                    )}
                    {villainCurrentHealth > 0 && heroCurrentHealth <= 0 ? (
                      <strong>
                        {fightPageVillainContext.name}
                        {
                          " is VICTORIOUS! YOU HAVE FAILED. Rejoin the rest of your team and recoup, add more Heroes. For there is always villains trying to take over the universe!"
                        }
                      </strong>
                    ) : (
                      <></>
                    )}

                    <MDBCardText id="villainMessage"></MDBCardText>
                  </MDBCardBody>
                  <hr></hr>
                  <MDBRow>
                    <MDBCol className="text-center">
                      {villainCurrentHealth <= 0 || heroCurrentHealth <= 0 ? (
                        <>
                          <MDBLink to="/search">
                            <MDBBtn
                              color="secondary"
                              size="md"
                              onClick={resetVillainContext}
                            >
                              Search for More Heroes!
                            </MDBBtn>
                          </MDBLink>
                        </>
                      ) : (
                        <MDBBtn
                          className="mb-1"
                          color="danger"
                          size="sm"
                          onClick={readyFighters}
                        >
                          Ready to Fight!
                        </MDBBtn>
                      )}
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBView>
          </Fragment>
        </MDBAnimation>
        {/* Villain CArd */}
        <MDBAnimation type="fadeInRight" delay="2s">
          <Fragment>
            <MDBView hover zoom>
              <MDBCard style={{ width: "17rem" }} className="m-2">
                <MDBCardImage
                  className="img-thumbnail"
                  src={fightPageVillainContext.img_url}
                  style={{
                    width: "100%",
                    maxHeight: "338px",
                  }}
                  alt={`picture of ${fightPageVillainContext.name}`}
                />
                <MDBCardBody
                  style={{
                    minHeight: "24rem",
                    padding: "none",
                    textTransform: "capitalize",
                  }}
                >
                  <MDBCardTitle className="align-text-center myColor">
                    <strong>{fightPageVillainContext.name}</strong>
                  </MDBCardTitle>
                  <hr></hr>
                  <div style={{ height: "12rem" }}>
                    <MDBCardText className="marginBtm mt-0">
                      <strong>
                        Tier Ranking:{" "}
                        <span className="myColor">
                          {fightPageVillainContext.tier_list}
                        </span>{" "}
                      </strong>
                    </MDBCardText>
                    <MDBCardText>
                      <strong>
                        Total Power: {fightPageVillainContext.total_power}
                      </strong>{" "}
                    </MDBCardText>
                    <MDBCardText>
                      <strong>
                        Total Attack: {fightPageVillainContext.attack}
                      </strong>{" "}
                    </MDBCardText>
                    <MDBCardText>
                      <strong>
                        Total Health: {fightPageVillainContext.totalHealth}
                      </strong>{" "}
                    </MDBCardText>
                    <MDBCardText>
                      Health:
                      {fightPageVillainContext.currentHealth > 0 ? (
                        <MDBProgress
                          className="my-2"
                          material
                          value={Math.floor(
                            (fightPageVillainContext.currentHealth /
                              fightPageVillainContext.totalHealth) *
                              100
                          )}
                          color={statBarColor(
                            parseInt(
                              Math.floor(
                                (fightPageVillainContext.currentHealth /
                                  fightPageVillainContext.totalHealth) *
                                  100
                              )
                            )
                          )}
                          animated
                        >
                          {Math.floor(
                            (fightPageVillainContext.currentHealth /
                              fightPageVillainContext.totalHealth) *
                              100
                          ) + "%"}
                        </MDBProgress>
                      ) : (
                        <MDBProgress
                          className="my-2"
                          material
                          value={0}
                          animated
                        >
                          0
                        </MDBProgress>
                      )}
                    </MDBCardText>
                  </div>
                  <hr></hr>
                  <MDBDropdown className="text-center" size="sm" hover dropup>
                    <MDBDropdownToggle color="secondary">
                      Power Stats
                    </MDBDropdownToggle>
                    <MDBDropdownMenu color="secondary" basic>
                      <MDBDropdownItem>
                        Combat: {fightPageVillainContext.combat}
                        <MDBProgress
                          className="my-2"
                          material
                          value={fightPageVillainContext.combat}
                          color={statBarColor(
                            parseInt(fightPageVillainContext.combat)
                          )}
                        />
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        Durability: {fightPageVillainContext.durability}
                        <MDBProgress
                          className="my-2"
                          material
                          value={fightPageVillainContext.durability}
                          color={statBarColor(
                            parseInt(fightPageVillainContext.durability)
                          )}
                        />
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        Intelligence: {fightPageVillainContext.intel}
                        <MDBProgress
                          className="my-2"
                          material
                          value={fightPageVillainContext.intel}
                          color={statBarColor(
                            parseInt(fightPageVillainContext.intel)
                          )}
                        />
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        Power: {fightPageVillainContext.power}
                        <MDBProgress
                          className="my-2"
                          material
                          value={fightPageVillainContext.power}
                          color={statBarColor(
                            parseInt(fightPageVillainContext.power)
                          )}
                        />
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        Speed: {fightPageVillainContext.speed}
                        <MDBProgress
                          className="my-2"
                          material
                          value={fightPageVillainContext.speed}
                          color={statBarColor(
                            parseInt(fightPageVillainContext.speed)
                          )}
                        />
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        Strength: {fightPageVillainContext.strength}
                        <MDBProgress
                          className="my-2"
                          material
                          value={fightPageVillainContext.strength}
                          color={statBarColor(
                            parseInt(fightPageVillainContext.strength)
                          )}
                        />
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                  <MDBRow>
                    <MDBCol className="text-center"></MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBView>
          </Fragment>
        </MDBAnimation>
      </MDBRow>
    </>
  );
}

export default FinalFightPage;
