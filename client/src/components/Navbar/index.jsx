import React, { useState, useContext, Fragment } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBCollapse,
} from "mdbreact";

import "./index.css";
import AuthenticationContext from "../../context/authenticationContext";
import axios from "axios";
// useContext

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  console.log("collapsed: ", collapsed);
  const { isAuthenticated, setIsAuthenticated } = useContext(
    AuthenticationContext
  );

  const handleTogglerClick = () => {
    setCollapsed((prevState) => ({
      collapsed: !prevState.collapsed,
    }));
  };

  function handleLogout() {
    setIsAuthenticated(false);
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/logout",
    })
      .then((res) => {
        console.log("user logged out");
      })
      .catch(console.error);
  }

  const overlay = (
    <div
      id="sidenav-overlay"
      style={{ backgroundColor: "transparent" }}
      onClick={handleTogglerClick}
    />
  );

  return (
    <div id="apppage">
      <MDBNavbar
        color="info-color"
        dark
        expand="md"
        fixed="top"
        scrolling
        transparent
      >
        <MDBContainer>
          <MDBNavbarBrand>
            <strong className="white-text">SuperHero Universe</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={handleTogglerClick} />
          <MDBCollapse isOpen={collapsed} navbar>
            <MDBNavbarNav left>
              {isAuthenticated && (
                <Fragment>
                  <MDBNavItem>
                    <MDBLink to="/search">Search</MDBLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBLink to="/fight">Universe</MDBLink>
                  </MDBNavItem>
                </Fragment>
              )}
            </MDBNavbarNav>
            <MDBNavbarNav right>
              {isAuthenticated && (
                <MDBNavItem>
                  <MDBLink to="/login" onClick={handleLogout}>
                    Log Out
                  </MDBLink>
                </MDBNavItem>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      {collapsed && overlay}
    </div>
  );
};

export default Navbar;
