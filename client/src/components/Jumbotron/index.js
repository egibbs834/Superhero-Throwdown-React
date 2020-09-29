import React from "react";
import { MDBJumbotron, MDBContainer } from "mdbreact";
import "./style.css"

const JumbotronPage = () => {
  return (
    <MDBJumbotron >
      <MDBContainer>
        <h2 className="display-4">Fluid jumbotron</h2>
        <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
      </MDBContainer>
    </MDBJumbotron>
  )
}

export default JumbotronPage;