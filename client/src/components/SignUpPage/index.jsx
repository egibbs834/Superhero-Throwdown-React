import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput,
  MDBAnimation,
  MDBView,
  MDBLink,
} from "mdbreact";
import axios from "axios";

import "./styleSignUp.css";

const SignUpPage = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  // console.log("registerEmail: ", registerEmail);
  const [registerPassword, setRegisterPassword] = useState("");
  // console.log("registerPassword: ", registerPassword);

  function handleInputChangeEmail(event) {
    event.preventDefault();
    setRegisterEmail(event.target.value);
  }
  function handleInputChangePassword(event) {
    event.preventDefault();
    setRegisterPassword(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log({ registerEmail, registerPassword });
    axios({
      method: "POST",
      data: {
        email: registerEmail,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:3001/signup",
    }).then((res) => {
      console.log("res: ", res);
    });
  }
  return (
    <MDBView className="bg">
      <div className="container-fluid flex gradient">
        <MDBContainer className="myContainer">
          <MDBRow className="justify-content-center align-items-center">
            <MDBCol md="6">
              <MDBAnimation type="fadeInRight" delay=".3s">
                <MDBCard className="cardBg">
                  <MDBCardBody>
                    <MDBCardHeader className="form-header card-gradient rounded">
                      <h3 className="my-3">
                        <MDBIcon icon="lock" /> Sign Up:
                      </h3>
                    </MDBCardHeader>
                    <form>
                      <div className="grey-text">
                        <MDBInput
                          label="Type your email"
                          icon="envelope"
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          onChange={handleInputChangeEmail}
                          value={registerEmail}
                        />
                        <MDBInput
                          label="Type your password"
                          icon="lock"
                          group
                          type="password"
                          validate
                          onChange={handleInputChangePassword}
                          value={registerPassword}
                        />
                      </div>

                      <div className="text-center mt-4">
                        <MDBBtn
                          onClick={handleFormSubmit}
                          color="secondary"
                          className="mb-3"
                          type="submit"
                        >
                          Sign Up
                        </MDBBtn>
                      </div>
                    </form>
                    <MDBModalFooter>
                      <div className="font-weight-light mr-auto">
                        <MDBLink to="/login">Already a member? Login</MDBLink>
                      </div>
                    </MDBModalFooter>
                  </MDBCardBody>
                </MDBCard>
              </MDBAnimation>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </MDBView>
  );
};

export default SignUpPage;
