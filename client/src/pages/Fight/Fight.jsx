import React, { useState, useEffect, useContext } from "react";
import {
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBCard,
  MDBView,
  MDBMask,
  MDBAnimation,
} from "mdbreact";
import Jumbotron from "../../components/Jumbotron";
import "./style.css";
import parallaxImg from "./images/orangeNebula.jpg";
import FightPageHeroContext from "../../context/fightPageHeroContext";
import FightPageVillainContext from "../../context/fightPageVillainContext";
import FightPageVillainCard from "../../components/FightPageVillainCard";
import FightPageHeroCard from "../../components/FightPageHeroCard";
import LoadingSpinner from "../../components/LoadSpinner";
import FightPageStatsCard from "../../components/FightPageStatsCard";
import FinalFightPage from "../../components/FinalFightPage";

function Fight() {
  const [isLoading, setIsLoading] = useState(true);
  const { fightPageHeroContext, setFightPageHeroContext } = useContext(
    FightPageHeroContext
  );
  const { fightPageVillainContext, setFightPageVillainContext } = useContext(
    FightPageVillainContext
  );

  useEffect(() => {
    const fightPageHero = fightPageHeroContext;
    const fightPageVillain = fightPageVillainContext;
    setIsLoading(false);
    console.log("Welcome to the fight page");
    console.log("(FightPage) fightPageHeroContext: ", fightPageHeroContext);
    console.log(
      "(FightPage) fightPageVillainContext: ",
      fightPageVillainContext
    );
  }, []);

  // console.log(`all heroes in universe for ${username}: ${heroes}`)
  return (
    <div id="fightPage">
      {/* <MDBJumbotron>Welcome to our universe</MDBJumbotron> */}
      <MDBView src={parallaxImg} fixed className="fightBackground">
        <MDBMask overlay="grey-light" className="flex-center"></MDBMask>
        <MDBContainer fluid className="mt-3">
          {isLoading ? (
            <MDBRow>
              <MDBCol className="text-center align-items-center mt-5">
                <LoadingSpinner />
              </MDBCol>
            </MDBRow>
          ) : (
            <FinalFightPage />
          )}
        </MDBContainer>
      </MDBView>
    </div>
  );
}

export default Fight;
