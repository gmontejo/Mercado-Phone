import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Default from "./components/Default";
import Modal from "./components/Modal";
import CargaDatos from "./components/CargaDatos";
import ControlarProductos from "./components/ControlarProductos";
import styled from "styled-components";
import PrivateRoute from "./components/PrivateRoute";
import SignIn from "./components/SignIn";
import Footer from "./components/Footer";

function App() {
  return (
    <React.Fragment>
      <div style={{ height: "100vh" }}>
        <FlexDiv className="d-flex flex-column flex-grow-1">
          <Navbar />
          <Switch>
            <Route exact path="/" component={ProductList}></Route>
            <Route path="/details" component={Details}></Route>
            <Route path="/carga-datos" component={CargaDatos}></Route>
            <Route path="/signin" component={SignIn}></Route>
            <PrivateRoute
              component={ControlarProductos}
              path="/controlar-productos"
              exact
            />

            <Route component={Default}></Route>
          </Switch>
          <Footer />
          <Modal />
        </FlexDiv>
      </div>
    </React.Fragment>
  );
}

const FlexDiv = styled.div`
  min-height: 100vh;
  width: 100%;
`;

export default App;
