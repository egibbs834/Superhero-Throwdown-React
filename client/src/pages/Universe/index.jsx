import React, { useState, useEffect, useContext } from "react";
import { MDBContainer, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardText } from "mdbreact";
import UniverseCard from "../../components/UniverseCard"
import API from "../../utils/API"
import UsernameContext from "../../context/usernameContext";


export default function Universe() {

    const [heroes, setHeroes] = useState({});
    const { username, setUsername } = useContext(UsernameContext);
    console.log("Universe username: ", username)

    function populateUniverse() {
        console.log("populateUniverse username: ", username)
        API.getAllHeroes(username)
        .then((res) => {
            console.log("AllHeroes Res: ", res.data);
            setHeroes(res.data);
        })
        .catch(console.err)
    }

    // useEffect(() => {
    //     console.log('trigger use effect hook');
    //     populateUniverse()

    //     // setTimeout(() => {
    //     //   setMessage("I'm fine, thanks for asking.");
    //     // }, 1000)
    //   }, []);
      
    // console.log(`all heroes in universe for ${username}: ${heroes}`)
    console.log("heroes: ", heroes)
    return (
        <MDBContainer>
            <MDBRow className="justify-content-center row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5" id="rowWrapper">
                <MDBCard>
                    <MDBCardBody>
                        <MDBCardText>
                            We made it to the Universe
                            <UniverseCard />
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </MDBRow>
        </MDBContainer>
    )
}