import React, { Fragment, useContext, useState, useEffect } from "react";

import {
  MDBContainer,
  MDBCard,
  MDBView,
  MDBMask,
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
} from "mdbreact";

import FightPageHeroContext from "../../context/fightPageHeroContext";
import FightPageVillainContext from "../../context/fightPageVillainContext";

import tempImg from "../../pages/Fight/images/orangeNebula.jpg";

function FinalFightPage() {
  const { fightPageHeroContext, setFightPageHeroContext } = useContext(
    FightPageHeroContext
  );
  const { fightPageVillainContext, setFightPageVillainContext } = useContext(
    FightPageVillainContext
  );
  console.log({ fightPageHeroContext, fightPageVillainContext });
  const heroAttack = Math.floor(
    fightPageHeroContext.intelligence * 1.75 +
      fightPageHeroContext.power +
      fightPageHeroContext.combat * 1.3
  );
  console.log({ heroAttack });

  const villainAttack = Math.floor(
    fightPageVillainContext.intel * 1.75 +
      fightPageVillainContext.power +
      fightPageVillainContext.combat * 1.3
  );
  console.log({ villainAttack });

  useEffect(() => {
    setFightPageHeroContext({
      ...fightPageHeroContext,
      attack: Math.floor(
        fightPageHeroContext.intelligence * 1.75 +
          fightPageHeroContext.power +
          fightPageHeroContext.combat * 1.3
      ),
      totalHealth: Math.floor(
        fightPageHeroContext.durability * 2.75 +
          fightPageHeroContext.speed * 1.25 +
          fightPageHeroContext.strength
      ),
      currentHealth: Math.floor(
        fightPageHeroContext.durability * 2.75 +
          fightPageHeroContext.speed * 1.25 +
          fightPageHeroContext.strength
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
  }, []);

  // console.log({ randomAttack });

  // function randomizeAttack() {
  //   var randomHeroAttack = Math.floor(Math.random() * heroAttack) / 2 + 5;

  //   setRandomAttack(
  //     {
  //       hero: Math.floor((Math.random() * fightPageHeroContext.attack) / 2 + 5),
  //       villain: Math.floor(
  //         (Math.random() * fightPageVillainContext.attack) / 2 + 5
  //       ),
  //     },
  //     handleAttack()
  //   );
  // }

  function handleAttack() {
    var randomHeroAttack = Math.floor(Math.random() * heroAttack) / 2;
    console.log({ randomHeroAttack });

    setFightPageVillainContext({
      ...fightPageVillainContext,
      currentHealth: fightPageVillainContext.currentHealth - randomHeroAttack,
      randomAttack: randomHeroAttack,
    });

    setTimeout(() => {
      var randomVillainAttack = Math.floor(Math.random() * villainAttack) / 2;
      console.log({ randomVillainAttack });
      setFightPageHeroContext({
        ...fightPageHeroContext,
        currentHealth: fightPageHeroContext.currentHealth - randomVillainAttack,
        randomAttack: randomVillainAttack,
      });
    }, 2000);
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
                  maxHeight: "24rem",
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
                    Health:
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
                <MDBRow>
                  <MDBCol className="text-center">
                    <MDBBtn
                      className="mb-1"
                      color="danger"
                      size="sm"
                      onClick={handleAttack}
                    >
                      Attack!
                    </MDBBtn>
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
              <MDBCardImage
                className="img-thumbnail"
                // src={villain.img_url}
                src={tempImg}
                style={{
                  width: "100%",
                  maxHeight: "338px",
                }}
                // alt={`picture of ${villain.name}`}
              />
              <MDBCardBody
                style={{
                  maxHeight: "24rem",
                  padding: "none",
                  textTransform: "capitalize",
                }}
              >
                <MDBCardTitle className="align-text-center myColor">
                  {/* <strong>{villain.name}</strong> */}
                  <strong>Temp stats Card</strong>
                </MDBCardTitle>
                <hr></hr>
                <div style={{ height: "10rem" }}>
                  {!fightPageVillainContext.randomAttack ? (
                    <></>
                  ) : (
                    <>
                      <MDBCardText>{`${fightPageHeroContext.name} hit for ${fightPageVillainContext.randomAttack}`}</MDBCardText>
                    </>
                  )}
                  {!fightPageHeroContext.randomAttack ? (
                    <></>
                  ) : (
                    <MDBCardText>{`${fightPageVillainContext.name} hit for ${fightPageHeroContext.randomAttack}`}</MDBCardText>
                  )}

                  <MDBCardText id="villainMessage"></MDBCardText>
                </div>
                <hr></hr>
                <MDBRow>
                  <MDBCol className="text-center">
                    <MDBLink to="/fight">
                      <MDBBtn className="mb-1" color="danger" size="sm">
                        Ready to Fight!
                      </MDBBtn>
                    </MDBLink>
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
                  maxHeight: "24rem",
                  padding: "none",
                  textTransform: "capitalize",
                }}
              >
                <MDBCardTitle className="align-text-center myColor">
                  <strong>{fightPageVillainContext.name}</strong>
                </MDBCardTitle>
                <hr></hr>
                <div style={{ height: "10rem" }}>
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
                    Health:
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
                  <MDBCol className="text-center">
                    {/* <MDBLink to="/fight">
                  <MDBBtn className="mb-1" color="danger" size="sm" >
                  Fight!</MDBBtn>
                </MDBLink>   */}
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBView>
        </Fragment>
      </MDBAnimation>
    </MDBRow>
  );
}

export default FinalFightPage;
