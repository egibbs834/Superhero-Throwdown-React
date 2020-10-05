import React, { useState, useEffect, useContext } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBView,
  MDBJumbotron,
  MDBAnimation,
  MDBMask,
} from "mdbreact";

import FightPageVillainContext from "../../context/fightPageVillainContext";
import UniverseCard from "../../components/UniverseCard";
import API from "../../utils/API";
import UsernameContext from "../../context/usernameContext";
import "./style.css";
import parallaxImg from "./images/blueVredCloudsNebula.jpg";
import LoadingSpinner from "../../components/LoadSpinner";
import { useSpring, animated as a } from "react-spring";
import UniverseCardFront from "../../components/UniverseCardFront";

export default function Universe(props) {
  const [heroes, setHeroes] = useState({});
  const { username, setUsername } = useContext(UsernameContext);
  const [isLoading, setIsLoading] = useState(true);
  const { fightPageVillainContext } = useContext(FightPageVillainContext);

  // Handles state for card flips
  // const [flipped, set] = useState(false);
  // const { transform, opacity } = useSpring({
  //   opacity: flipped ? 1 : 0,
  //   transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
  //   config: { mass: 5, tension: 500, friction: 80 },
  // });

  console.log("Universe username: ", username);

  function populateUniverse() {
    console.log("populateUniverse username: ", username);
    API.getAllHeroes(username)
      .then((res) => {
        console.log("AllHeroes Res: ", res.data);
        setHeroes(res.data);
        setIsLoading(false);
      })
      .catch(console.err);
  }

  useEffect(() => {
    console.log("trigger use effect hook");
    populateUniverse();
    // setTimeout(() => {
    //   setMessage("I'm fine, thanks for asking.");
    // }, 1000)
  }, []);

  // console.log(`all heroes in universe for ${username}: ${heroes}`)
  console.log("heroes: ", heroes);
  return (
    <div id="universePage">
      {/* <MDBJumbotron>Welcome to our universe</MDBJumbotron> */}
      <MDBView src={parallaxImg} fixed className="universeBackground">
        <MDBMask overlay="grey-light" className="flex-center"></MDBMask>

        <MDBContainer fluid className="mt-3 justify-content-center">
          {isLoading ? (
            <MDBRow>
              <MDBCol className="text-center align-items-center">
                <LoadingSpinner />
              </MDBCol>
            </MDBRow>
          ) : (
            <MDBAnimation type="fadeInDown" delay="1s">
              <MDBContainer className="marginTop">
                <MDBRow>
                  <MDBBtn
                    className="text-white text-center"
                    color="secondary"
                    style={{ width: "100%", height: "50%" }}
                  >
                    <MDBCardText className="text-white lead">{`${fightPageVillainContext.name} is still approaching... choose from the heroes you have assembled or go back and do some more research. A warrior can never be too prepared...`}</MDBCardText>
                  </MDBBtn>
                </MDBRow>
              </MDBContainer>
              <MDBRow
                className="justify-content-center align-items-center  mx-5"
                id="rowWrapper"
              >
                {heroes.map((character, i) => {
                  return (
                    <MDBCol className="mt-5" key={i}>
                      <UniverseCard character={character} />

                      {/* <a.div
                        className="c front" style=
                        {{ opacity: opacity.interpolate((o) => 1 - o),transform }}
                        >
                          <MDBView hover zoom>
                            <MDBCard style={{ width: "17rem" }} className="m-2">
                              <UniverseCardFront character={character} />
                              <UniverseCard characters={character} />
                            </MDBCard>
                          </MDBView>
                      </a.div> */}
                    </MDBCol>
                  );
                })}
              </MDBRow>
            </MDBAnimation>
          )}
        </MDBContainer>
      </MDBView>
    </div>
  );
}
