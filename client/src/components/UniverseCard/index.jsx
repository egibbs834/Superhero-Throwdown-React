import { render } from 'react-dom'
import React, { useState } from 'react'
import { useSpring, animated as a } from 'react-spring'
import "./style.css"
import {
    MDBView,
    MDBBtn,
    MDBCard,
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
  } from "mdbreact";
import "./style.css";
import UniverseCardFront from "../UniverseCardFront";
// import UniverseCardBack from "../UniverseCardBack";

  export default function UniverseCard(props) {
    const [flipped, set] = useState(false)
    const { transform, opacity } = useSpring({
      opacity: flipped ? 1 : 0,
      transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
      config: { mass: 5, tension: 500, friction: 80 }
    })
    console.log("universe card props: ", props)
    return(
        <div >
            <MDBRow className="justify-content-center align-items-center row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 mx-5" id="rowWrapper">
            {props.characters.map((character, i) => {
                return (
                    <MDBCol className = "mt-5">
                        <UniverseCardFront character={character} increment={i} />

                        {/* <a.div className="c front"  onClick={() => set(state => !state)} style={{ opacity: opacity.interpolate(o => 1 - o), transform }}>
                        Front Card component here
                            <UniverseCardFront character={character} increment={i}/>
                        </a.div> */}
                        {/* <a.div className="c back" style={{ opacity, transform: transform.interpolate(t => `${t} rotateY(180deg)`) }}>
                            Back Card component here 
                             <UniverseCardBack character={character} />
                        </a.div> */}
                    </MDBCol>
                )
             })}
            </MDBRow>
        </div> 
    )
  }