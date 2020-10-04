import React, { useState, useContext } from "react";
import {
  MDBMask,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBAnimation,
  MDBCard,
  MDBJumbotron,
} from "mdbreact";
import LoadingSpinner from "../LoadSpinner";
import "./index.css";

import API from "../../utils/API";
import ResultCard from "../Search-Result-Card";
import AuthenticationContext from "../../context/authenticationContext";
import UsernameContext from "../../context/usernameContext";
import HeroContext from "../../context/heroContext";
import HeroChart from "../Chart/index";
import Counter from "../FightBtnClicker/index";
import FightPageVillainContext from "../../context/fightPageVillainContext"


function SearchPage(props) {
  console.log("(SearchPage) props: ", props);
  const [searchName, setSearchName] = useState("");
  const [results, setResults] = useState({
    results: [],
    characters: [],
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Sets default state to display content is loading
  const [isLoading, setIsLoading] = useState(false);

  const {fightPageVillainContext, setFightPageVillainContext} = useContext(FightPageVillainContext);
  console.log("fightPageVillainContext: ", fightPageVillainContext);

  // const [randomVillain, setRandomVillain] = useState("");
  // console.log("randomVillain: ", randomVillain);

  const { isAuthenticated } = useContext(AuthenticationContext);
  console.log("isAuthenticated: ", isAuthenticated);

  // if (!isAuthenticated) {
  //   props.match.url("/login");
  // }

  const { username } = useContext(UsernameContext);
  console.log("username: ", username);

  const { heroContext, setHeroContext } = useContext(HeroContext);

  function handleInputChange(event) {
    event.preventDefault();
    setSearchName(event.target.value);
  }
  function getRandomVillain() {
    API.getRandomVillain().then((res) => {
      console.log("res: ", res);
      setFightPageVillainContext(res.data[0]);
    });
  }


  // check if there are no keys in our object, meanign we have an empty object
  console.log("Number of keys in fightPageVillainContext: ", Object.keys(fightPageVillainContext).length);
  if (Object.keys(fightPageVillainContext).length === 0) {
    getRandomVillain();

  }

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

  function handleFormSubmit() {
    setIsLoading(true);
    setHeroContext({});
    API.getSuperhero(searchName)
      .then((res) => {
        setIsLoading(false);
        console.log("res: ", res);
        if (res.data.error) {
          setErrorMessage(res.data.error);
        } else {
          setErrorMessage("");
        }
        let character = res.data.results.map((character) => {
          const total =
            parseInt(character.powerstats.combat) +
            parseInt(character.powerstats.durability) +
            parseInt(character.powerstats.intelligence) +
            parseInt(character.powerstats.power) +
            parseInt(character.powerstats.speed) +
            parseInt(character.powerstats.strength);

          return {
            img: character.image.url,
            name: character.name,
            heroID: parseInt(character.id),
            publisher: character.biography.publisher,
            alignment: character.biography.alignment,
            race: character.appearance.race,
            height: character.appearance.height[0],
            weight: character.appearance.weight[0],
            tierList: tierList(total),
            totalPower: total,
            combat: parseInt(character.powerstats.combat),
            durability: parseInt(character.powerstats.durability),
            intelligence: parseInt(character.powerstats.intelligence),
            power: parseInt(character.powerstats.power),
            speed: parseInt(character.powerstats.speed),
            strength: parseInt(character.powerstats.strength),
            powerStats: character.powerstats,
            appearance: character.appearance,
            biography: character.biography,
            connections: character.connections,
            work: character.work,
          };
        });
        console.log("character: ", character);

        setResults({
          results: res.data.results,
          characters: character,
        });
      })

      .catch(console.error);
  }

  

  
  return (
    <div>
      <div id="apppage">
        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer>
              <MDBRow>
                <MDBCol
                  md="8"
                  className="white-text text-center text-md-left mt-xl-5 mb-5"
                >
                  <MDBAnimation type="fadeInLeft" delay=".3s">
                    <h1 className="h1-responsive font-weight-bold mt-sm-5">
                      Search over 700 comicbook superheroes and villains!
                    </h1>
                    <hr className="hr-light" />
                    <div className="active-pink-3 active-pink-4 mb-4">
                      <input
                        onChange={handleInputChange}
                        value={searchName}
                        className="form-control"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <MDBBtn
                        onClick={handleFormSubmit}
                        color="secondary"
                        className="ml-0"
                        size="sm"
                        href="#searched"
                        type="submit"
                      >
                        Search
                      </MDBBtn>
                    </div>
                  </MDBAnimation>
                </MDBCol>
                <MDBCol md="6" xl="5" className="mt-xl-5"></MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>
      <MDBRow className="justify-content-center mt-2">
        <MDBAnimation type="fadeInRight" delay=".3s">
          <MDBBtn
            className="text-white text-center"
            color="secondary"
            style={{ width: "100%", height: "100%" }}
          >
            <h1>Searched Comic Book Characters</h1>
          </MDBBtn>
        </MDBAnimation>
      </MDBRow>
      <MDBContainer fluid className="justify-content-center">
        <MDBJumbotron>
          <MDBRow className="justify-content-center" id="searched">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <MDBCol className="justify-content-center align-items-center text-center container-fluid">
                {errorMessage ? (
                  <div className="alert alert-danger">{`${errorMessage}`}</div>
                ) : results.characters.length ? (
                  <div className="row justify-content-center align-items-center container-fluid">
                    {results.characters.map((character, i) => (
                      <ResultCard key={i}character={character} results={results.results}/>
                    ))}
                  </div>
                ) : (
                  <h3>No Searches Yet</h3>
                )}
              </MDBCol>
            )}
          </MDBRow>
        </MDBJumbotron>
      </MDBContainer>
      {Object.keys(heroContext).length > 0 && (
        <MDBContainer fluid className="justify-content-center">
          <MDBJumbotron id="chart">
            <MDBRow className="justify-content-center">
              <MDBCard style={{ width: "100%", height: "100%" }}>
                <HeroChart />
              </MDBCard>
            </MDBRow>
          </MDBJumbotron>
        </MDBContainer>
      )}
      <MDBContainer>
        <MDBJumbotron>
          <Counter />
        </MDBJumbotron>
      </MDBContainer>
    </div>
  );
}
export default SearchPage;
