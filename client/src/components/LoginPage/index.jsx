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

import "./styleLogin.css";

const LoginPage = (props) => {
  console.log("props: ", props);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  function handleInputChangeUsername(event) {
    event.preventDefault();
    setLoginUsername(event.target.value);
  }
  function handleInputChangePassword(event) {
    event.preventDefault();
    setLoginPassword(event.target.value);
  }

  function handleLogin(event) {
    event.preventDefault();
    // console.log({ loginUsername, loginPassword });
    axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:3001/login",
    })
      .then((res) => {
        console.log("res: ", res);
        if (res.data === "Succesfully Authenticated") {
          props.history.push("/search");
        } else {
          throw Error(res.data);
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
              <MDBAnimation type="fadeInLeft" delay=".3s">
                <MDBCard className="cardBg">
                  <MDBCardBody>
                    <MDBCardHeader className="form-header card-gradient rounded">
                      <h3 className="my-3">
                        <MDBIcon icon="lock" /> Login:
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
                          value={loginUsername}
                        />
                        <MDBInput
                          label="Type your password"
                          icon="lock"
                          group
                          type="password"
                          validate
                          onChange={handleInputChangePassword}
                          value={loginPassword}
                        />
                      </div>

                      <div className="text-center mt-4">
                        <MDBBtn
                          onClick={handleLogin}
                          color="secondary"
                          className="mb-3"
                          type="submit"
                        >
                          Login
                        </MDBBtn>
                      </div>
                    </form>
                    <MDBModalFooter>
                      <div className="font-weight-light mr-auto">
                        <MDBLink to="/signup">Not a member? Sign Up</MDBLink>
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

export default LoginPage;
