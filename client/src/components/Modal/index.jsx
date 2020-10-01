import React, { useState } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBCol,
  MDBRow,
  MDBModalHeader,
  MDBModalFooter,
  MDBIcon,
} from "mdbreact";
import API from "../../utils/API";

function AddHeroModal(props) {
  console.log("modal props: ", props);

  const [state, setState] = useState({
    modal6: false,
  });
  const [message, setMessage] = useState("");
  console.log("message: ", message);

  // hits our API to hit route to backend to add to datatbase
  function addHeroToDatabase(character, username) {
    console.log("MyCharacter: ", character);
    const heroToBeAdded = { character, username };
    console.log("heroToBeAdded: ", heroToBeAdded);
    API.addHero(heroToBeAdded)
      .then((res) => {
        console.log(`res: `, res);
        setMessage(res.data);
      })
      .catch(console.error);
  }

  const toggle = (nr) => () => {
    let modalNumber = "modal" + nr;
    setState({
      [modalNumber]: !state[modalNumber],
    });
    setMessage("");
  };

  return (
    <MDBContainer>
      <MDBBtn onClick={toggle(6)} outline color="secondary">
        Add to Universe
      </MDBBtn>
      <MDBModal
        modalStyle="info"
        className="text-white"
        size="sm"
        centered
        backdrop={false}
        isOpen={state.modal6}
        toggle={toggle(6)}
      >
        <MDBModalHeader
          className="text-center"
          titleClass="w-100"
          tag="p"
          toggle={toggle(6)}
        >
          {`Add ${props.character.name} to the universe?`}
        </MDBModalHeader>

        {message ===
        `${props.character.name} has been added to your universe!` ? (
          <MDBModalBody className="text-center alert alert-success m-0">
            {message}
          </MDBModalBody>
        ) : message ===
          `${props.character.name} already exists in your universe!` ? (
          <MDBModalBody className="text-center alert alert-danger m-0">
            {message}
          </MDBModalBody>
        ) : (
          <MDBModalBody className="text-center">
            <MDBIcon icon="check" size="4x" className="animated rotateIn" />
          </MDBModalBody>
        )}

        <MDBModalFooter className="justify-content-center">
          {message ===
            `${props.character.name} has been added to your universe!` ||
          message ===
            `${props.character.name} already exists in your universe!` ? (
            <>
              <MDBBtn color="secondary" onClick={toggle(6)}>
                <MDBIcon
                  hover
                  icon="user-check"
                  size="2x"
                  className="animated rotateInDownRight"
                />
              </MDBBtn>
            </>
          ) : (
            <>
              <MDBBtn
                color="secondary"
                onClick={() =>
                  addHeroToDatabase(props.character, props.username)
                }
              >
                Yes
              </MDBBtn>
              <MDBBtn color="danger" outline onClick={toggle(6)}>
                No
              </MDBBtn>
            </>
          )}
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
}

export default AddHeroModal;
