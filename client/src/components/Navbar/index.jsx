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
  MDBIcon,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";

import "./index.css";
import AuthenticationContext from "../../context/authenticationContext";
import UsernameContext from "../../context/usernameContext";
import HeroContext from "../../context/heroContext";
import API from "../../utils/API";
// useContext

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  console.log("collapsed: ", collapsed);
  const { isAuthenticated, setIsAuthenticated } = useContext(
    AuthenticationContext
  );

  const { username, setUsername } = useContext(UsernameContext);
  console.log("(Navbar) username: ", username);

  const { heroContext, setHeroContext } = useContext(HeroContext);

  const handleTogglerClick = () => {
    // setCollapsed((prevState) => ({
    //   collapsed: !prevState.collapsed,
    // }));
    setCollapsed(!collapsed);
  };
  // hello

  // sets authentication and username back to false and empty string for next user to login and hits route to back end to hit a req.logout
  function handleLogout() {
    setIsAuthenticated(false);
    setUsername("");
    setHeroContext({});
    API.handleLogout()
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
            <strong className="">SuperHero Universe</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={handleTogglerClick} />
          <MDBCollapse isOpen={collapsed} navbar>
            <MDBNavbarNav left>
              {isAuthenticated && (
                <Fragment>
                  <MDBNavItem>
                    {/* <MDBLink to="/search" onClick={handleHeroContext}> */}
                    <MDBLink to="/search">

                      Search
                    </MDBLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBLink to="/universe">Universe</MDBLink>
                  </MDBNavItem>
                </Fragment>
              )}
            </MDBNavbarNav>
            <MDBNavbarNav right>
              {isAuthenticated && (
                <MDBDropdown size="sm" hover>
                  <MDBDropdownToggle onClick={handleTogglerClick}>
                    {`${username.toUpperCase()} `}
                    <MDBIcon icon="user"></MDBIcon>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem>
                      <MDBNavItem>
                        <MDBLink
                          to="/login"
                          onClick={handleLogout}
                          className="customHover black-text"
                        >
                          Logout
                        </MDBLink>
                      </MDBNavItem>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
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
