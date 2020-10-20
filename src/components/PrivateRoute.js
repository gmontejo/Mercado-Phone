import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ProductConsumer } from "../context";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <ProductConsumer>
      {(value) => (
        <Route
          {...rest}
          render={(props) =>
            value.isLogin ? <Component {...props} /> : <Redirect to="/signin" />
          }
        />
      )}
    </ProductConsumer>
  );
};

export default PrivateRoute;
