import React, { useState, useEffect, useContext } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBView,
  MDBJumbotron,
  MDBAnimation,
  MDBMask,
} from "mdbreact";
import UniverseCard from "../../components/UniverseCard";
import API from "../../utils/API";
import UsernameContext from "../../context/usernameContext";
import "./style.css";
import parallaxImg from "./images/blueVredCloudsNebula.jpg";
import LoadingSpinner from "../../components/LoadSpinner";
import { useSpring, animated as a } from "react-spring";

export default function Universe() {
  const [heroes, setHeroes] = useState({});
  const { username, setUsername } = useContext(UsernameContext);
  const [isLoading, setIsLoading] = useState(true);

  // Handles state for card flips
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

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
              <UniverseCard characters={heroes} />
            </MDBAnimation>
          )}
        </MDBContainer>
      </MDBView>
    </div>
  );
}
