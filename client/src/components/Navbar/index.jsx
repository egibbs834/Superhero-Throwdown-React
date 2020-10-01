import React, { useState } from "react";
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
// useContext

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleTogglerClick = () => {
    setCollapsed((prevState) => ({
      collapsed: !prevState.collapsed,
    }));
  };

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
              <MDBNavItem>
                <MDBLink to="/search">Search</MDBLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBLink to="/fight">Universe</MDBLink>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBLink to="/login">Log Out</MDBLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      {collapsed && (
        <div
          id="sidenav-overlay"
          style={{ backgroundColor: "transparent" }}
          onClick={handleTogglerClick}
        />
      )}
    </div>
  );
};

export default Navbar;
