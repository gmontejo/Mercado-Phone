import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../loguito.png";
import styled from "styled-components";
import { ButtonContainer } from "./Button";

export default class Navbar extends Component {
  render() {
    return (
      <NavWrapper className="navbar navbar-expand-sm  navbar-dark px-sm-5">
        <Link to="/">
          <img
            src={logo}
            alt="store"
            className=""
            style={{ maxHeight: "40px", margin: "5px" }}
          />
        </Link>
        <ul className="navbar-nav align-items-center">
          <li
            className="nav-item ml-1"
            onClick={() => window.location.reload()}
          >
            <Link to="/" className="nav-link">
              Celulares
            </Link>
          </li>
        </ul>
        <Link to="/carga-datos" className="ml-auto">
          <ButtonContainer cart>Quiero Publicar</ButtonContainer>
        </Link>
      </NavWrapper>
    );
  }
}

const NavWrapper = styled.nav`
  background: var(--mainDark);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(18, 18, 29, 1) 50%,
    rgba(0, 0, 0, 1) 100%
  );
  .nav-link {
    color: var(--mainWhite) !important;
  }
  font-size: 1.3rem;
  text-transform: capitalize;
`;
