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
  MDBCardBody,
  MDBJumbotron,
} from "mdbreact";
import LoadingSpinner from "../LoadSpinner";
import "./index.css";

import API from "../../utils/API";
import ResultCard from "../Search-Result-Card";
import AuthenticationContext from "../../context/authenticationContext";
import UsernameContext from "../../context/usernameContext";

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

  const [randomVillain, setRandomVillain] = useState("");
  console.log("randomVillain: ", randomVillain);

  const { isAuthenticated } = useContext(AuthenticationContext);
  console.log("isAuthenticated: ", isAuthenticated);

  // if (!isAuthenticated) {
  //   props.match.url("/login");
  // }

  const { username } = useContext(UsernameContext);
  console.log("username: ", username);

  function handleInputChange(event) {
    event.preventDefault();
    setSearchName(event.target.value);
  }
  function getRandomVillain() {
    API.getRandomVillain().then((res) => {
      console.log("res: ", res);
      setRandomVillain(res);
    });
  }

  if (!randomVillain) {
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
          return {
            img: character.image.url,
            name: character.name,
            heroID: parseInt(character.id),
            publisher: character.biography.publisher,
            alignment: character.biography.alignment,
            race: character.appearance.race,
            height: character.appearance.height[0],
            weight: character.appearance.weight[0],
            tierList: tierList(
              parseInt(character.powerstats.combat) +
                parseInt(character.powerstats.durability) +
                parseInt(character.powerstats.intelligence) +
                parseInt(character.powerstats.power) +
                parseInt(character.powerstats.speed) +
                parseInt(character.powerstats.strength)
            ),
            totalPower:
              parseInt(character.powerstats.combat) +
              parseInt(character.powerstats.durability) +
              parseInt(character.powerstats.intelligence) +
              parseInt(character.powerstats.power) +
              parseInt(character.powerstats.speed) +
              parseInt(character.powerstats.strength),
            combat: parseInt(character.powerstats.combat),
            durability: parseInt(character.powerstats.durability),
            intelligence: parseInt(character.powerstats.intelligence),
            power: parseInt(character.powerstats.power),
            speed: parseInt(character.powerstats.speed),
            strength: parseInt(character.powerstats.strength),
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
          <MDBCard className="bg-secondary text-white">
            <MDBCardBody>
              <h1>Searched Comic Book Characters</h1>
            </MDBCardBody>
          </MDBCard>
        </MDBAnimation>
      </MDBRow>
      <MDBContainer fluid className="justify-content-center">
        <MDBJumbotron>
          <MDBRow className="justify-content-center" id="searched">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <ResultCard
                characters={results.characters}
                errorMessage={errorMessage}
              />
            )}
          </MDBRow>
        </MDBJumbotron>
      </MDBContainer>
    </div>
  );
}
export default SearchPage;
