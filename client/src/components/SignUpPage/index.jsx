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

const SignUpPage = (props) => {
  const [registerUsername, setRegisterUsername] = useState("");
  // console.log("registerUsername: ", registerUsername);
  const [registerPassword, setRegisterPassword] = useState("");
  // console.log("registerPassword: ", registerPassword);
  const [errorMessage, setErrorMessage] = useState({
    errorMessage: "",
  });

  function handleInputChangeUsername(event) {
    event.preventDefault();
    setRegisterUsername(event.target.value);
  }
  function handleInputChangePassword(event) {
    event.preventDefault();
    setRegisterPassword(event.target.value);
  }

  // function handleLoginErr(err) {
  //   setErrorMessage(err);
  //   console.log("errorMessage: ", errorMessage);
  // }

  function register(event) {
    event.preventDefault();
    console.log({ registerUsername, registerPassword });
    axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:3001/signup",
    })
      .then((res) => {
        console.log("res: ", res);
        if (res.data === "Succesfully Authenticated") {
          props.history.push("/search");
        } else {
          // handleLoginErr(res.data);
        }
      })
      .catch(console.error);
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
                          label="Type your username"
                          icon="user"
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          onChange={handleInputChangeUsername}
                          value={registerUsername}
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
                      <div
                        style={{ display: "none" }}
                        id="alert"
                        className="alert alert-danger"
                      >
                        <span
                          class="glyphicon glyphicon-exclamation-sign"
                          aria-hidden="true"
                        ></span>
                        <span class="sr-only">Error:</span>{" "}
                        <span class="msg"></span>
                      </div>
                      <div className="text-center mt-4">
                        <MDBBtn
                          onClick={register}
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
