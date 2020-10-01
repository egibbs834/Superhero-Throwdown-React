import React, { useState } from "react";
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

function SearchPage() {
  const [searchName, setSearchName] = useState("");
  const [results, setResults] = useState({
    results: [],
    characters: [],
  });
  // Sets default state to display content is loading
  const [isLoading, setIsLoading] = useState(false);
  // console.log("results: ", results);

  const [randomVillain, setRandomVillain] = useState({
    randomVillain: "empty",
  });
  console.log("randomVillain: ", randomVillain);
  function handleInputChange(event) {
    event.preventDefault();
    setSearchName(event.target.value);
  }
  function getRandomVillain() {
    API.getRandomVillain().then((res) => {
      // console.log("res: ", res);
      setRandomVillain(res);
    });
  }

  if (randomVillain.randomVillain === "empty") {
    getRandomVillain();
  }

  function handleFormSubmit() {
    setIsLoading(true);
    API.getSuperhero(searchName)
      .then((res) => {
        setIsLoading(false);
        console.log("res: ", res);
        const character = res.data.results.map((character) => {
          return {
            img: character.image.url,
            name: character.name,
            publisher: character.biography.publisher,
            alignment: character.biography.alignment,
            race: character.appearance.race,
            height: character.appearance.height[0],
            weight: character.appearance.weight[0],
            combat: character.powerstats.combat,
            durability: character.powerstats.durability,
            intelligence: character.powerstats.intelligence,
            power: character.powerstats.power,
            speed: character.powerstats.speed,
            strength: character.powerstats.strength,
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
  
      
        //         API.getSuperheroID(searchName)
        //           .then((res2) => {
        //             console.log("res2:", res2);
        //             const superHeroID = res2.data.results.map((superHeroID) => {
        //               return {
        //                 id: superHeroID.id;
        //                 // if(superHeroID.id.length === 3, superHeroID.id = "0" + superHeroID.id
        //                 // else(superheroID.id = superHeroID.id)
        //           }
        //             })
        //   }
        // )

        // })
        // API.getMoreInfo(superHeroID.id)
        //   .then((res3) => {
        //     console.log("res3:", res3);
        //     const superHeroID = res3.data.results.map((moreInfo) => {
        //       setResults({
        //         results3: res3.data.results,
        //         moreInfo: moreInfo,

        //       })
        //     }
        //     )
        //   })

        //   })

        // .catch (console.error);
        // }
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
              <MDBAnimation type="fadeInRight" delay=".3s">
                <MDBCard className="bg-secondary text-white">
                  <MDBCardBody>
                    <h1>Searched Comic Book Characters</h1>
                  </MDBCardBody>
                </MDBCard>
              </MDBAnimation>
            </MDBRow>
            {/*<MDBRow className="justify-content-center mt-5"> 
            {isLoading ? <LoadingSpinner /> : <MDBRow />}
      </MDBRow> */}
            <MDBContainer fluid className="justify-content-center">
              <MDBJumbotron>
                {/* <ResultCard characters={results.characters} /> */}
                <MDBRow className="justify-content-center" id="searched">
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : (
                      <ResultCard characters={results.characters} />
                    )}
                </MDBRow>
              </MDBJumbotron>
            </MDBContainer>
          </div>
        );

        export default SearchPage;