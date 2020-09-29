import React from "react";
import { MDBCol, MDBRow, MDBContainer, MDBCard } from "mdbreact";

function NoMatch() {
  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBRow size="md-12">
          <MDBCard>
            <h1>404 Page Not Found</h1>
            <h1>
              <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
              </span>
            </h1>
          </MDBCard>
        </MDBRow>
      </MDBRow>
    </MDBContainer>
  );
}

export default NoMatch;