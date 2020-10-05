import { render } from "react-dom";
import React, { useState } from "react";
import { useSpring, animated as a } from "react-spring";
import "./style.css";
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
import { Fragment } from "react";
import UniverseCardBack from "../UniverseCardBack";
import tempImg from "../../pages/Universe/images/purpleNebula.jpg"

// export default function UniverseCard(props) {
export default function UniverseCard({ character }) {
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: ` rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  console.log("universe card props: ", character);

  return (
    <Fragment>
      {flipped ? (
        // ========================================================================
        // BACK OF CARD
        // ========================================================================
        <a.div
          className="c back"
          style={{
            opacity,
            transform: transform.interpolate((t) => `${t} rotateY(180deg)`),
          }}
        >
          <MDBView hover zoom>
            <MDBCard style={{ width: "17rem" }} className="m-2">
              <div onClick={() => set(!flipped)}>
                <MDBCardImage
                  className="img-thumbnail"
                  src={character.img_url}
                  style={{
                    width: "100%",
                    maxHeight: "338px",
                  }}
                  alt={`picture of ${character.name}`}
                />
              </div>
              <UniverseCardBack character={character} />
            </MDBCard>
          </MDBView>
        </a.div>
      ) : (
        // ========================================================================
        // FRONT OF CARD
        // ========================================================================
        <a.div
          className="c front"
          style={{ opacity: opacity.interpolate((o) => 1 - o), transform }}
        >
          <MDBView hover zoom>
            <MDBCard style={{ width: "17rem" }} className="m-2">
              <div onClick={() => set(!flipped)}>
                <MDBCardImage
                  className="img-thumbnail"
                  src={character.img_url}
                  style={{
                    width: "100%",
                    maxHeight: "338px",
                  }}
                  alt={`picture of ${character.name}`}
                />
              </div>
              <UniverseCardFront character={character} />
            </MDBCard>
          </MDBView>
        </a.div>
      )}
    </Fragment>
  );
}

{
  /* <a.div class="c front" style={{ opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }} /> */
}
