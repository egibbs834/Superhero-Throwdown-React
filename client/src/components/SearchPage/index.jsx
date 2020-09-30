import React, { useState  } from "react";
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
import LoadingSpinner from "../LoadSpinner"
import "./index.css";

import API from "../../utils/API";
import ResultCard from "../Search-Result-Card";

function SearchPage() {
  const [searchName, setSearchName] = useState("");
  const [results, setResults] = useState({
    results: [],
    characters: [],
  });
  // Sets default state to display content is loading
  const [ isLoading, setIsLoading ] = useState(false)
  // console.log("results: ", results);
  function handleInputChange(event) {
    event.preventDefault();
    setSearchName(event.target.value);
  }

  function handleFormSubmit() {
    setIsLoading(true)
    API.getSuperhero(searchName)
      .then((res) => {
        setIsLoading(false)
        console.log("res: ", res);
        const character = res.data.results.map((character) => {
          return {
            img: character.image.url,
            name: character.name,
            alignment: character.biography.alignment,
            combat: character.powerstats.combat,
            durability: character.powerstats.durability,
            intelligence: character.powerstats.intelligence,
            power: character.powerstats.power,
            speed: character.powerstats.speed,
            strength: character.powerstats.strength,
            work: character.work.occupation,
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
                      >
                        Search
                      </MDBBtn>
                    </div>
                  </MDBAnimation>
                </MDBCol>
                {/* <MDBCol md="6" xl="5" className="mt-xl-5">
                  <MDBAnimation type="fadeInRight" delay=".3s">
                    <img
                      src={this.props.img}
                      alt=""
                      className="img-fluid rounded rightCardImg"
                    />
                  </MDBAnimation>
                </MDBCol> */}
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>
      <MDBRow className="justify-content-center mt-2">
        <MDBCard className="bg-secondary text-white">
          <MDBCardBody>
            <h1>Searched Comic Book Characters</h1>
          </MDBCardBody>
        </MDBCard>
      </MDBRow>
      {/*<MDBRow className="justify-content-center mt-5"> 
            {isLoading ? <LoadingSpinner /> : <MDBRow />}
      </MDBRow> */}
      <MDBContainer fluid className="justify-content-center">
        <MDBJumbotron>
          {/* <ResultCard characters={results.characters} /> */}
          <MDBRow className="justify-content-center">
            {isLoading ? <LoadingSpinner /> : <ResultCard characters={results.characters} />} 
          </MDBRow>   
        </MDBJumbotron>
      </MDBContainer>
    </div>
  );
}
export default SearchPage;
