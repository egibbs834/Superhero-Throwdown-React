import React, { useState, useEffect } from "react";
import { MDBContainer, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardText } from "mdbreact";
import UniverseCard from "../../components/UniverseCard"
import API from "../../utils/API"

export default function Universe() {

    const [heroes, setHeroes] = useState({});

    function populateUniverse() {
        API.getAllHeroes()
        .then((res) => {
            console.log("AllHeroes Res: ", res.data);
        })
        .catch(console.log("We had a problem"))
    }

    populateUniverse();

    return (
        <MDBContainer>
            <MDBRow className="justify-content-center row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5" id="rowWrapper">
                <MDBCard>
                    <MDBCardBody>
                        <MDBCardText>
                            We made it to the Universe
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </MDBRow>
        </MDBContainer>
    )
}