import React from "react";
import { ProductConsumer } from "../context";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

export default function SignIn() {
  const { register, handleSubmit, errors } = useForm();
  const userAdmin = { usuario: "yourUser", contraseña: "yourPW" };
  const [loginSuccessful, setLoginSuccessful] = React.useState(false);

  const submit = (data, funcion) => {
    if (
      data.usuario === userAdmin.usuario &&
      data.contraseña === userAdmin.contraseña
    ) {
      funcion();
      setLoginSuccessful(true);
    } else {
      window.alert("Usuario o contraseña incorrecta");
    }
  };

  return (
    <ProductConsumer>
      {(value) => (
        <React.Fragment>
          <div className="d-flex flex-column align-items-center m-4">
            <h3>Por favor ingresa tu usuario y contraseña</h3>
            <br />
            <div className="text-right">
              <form
                onSubmit={handleSubmit((data) =>
                  submit(data, value.handleLogin)
                )}
              >
                <label htmlFor="usuario">Usuario</label>
                <input
                  ref={register({ required: true })}
                  type="text"
                  name="usuario"
                  id="usuario"
                  className="my-2 ml-2"
                />
                <br />
                <label htmlFor="contraseña">Contraseña</label>
                <input
                  ref={register({ required: true })}
                  type="password"
                  name="contraseña"
                  id="contraseña"
                  className="my-2 ml-2"
                />
                <input
                  className="ml-auto"
                  id="buttonSubmit"
                  type="submit"
                  value="Ingresar"
                  style={{ display: "block" }}
                />
              </form>
              {loginSuccessful ? <Redirect to="/controlar-productos" /> : null}
            </div>
          </div>
        </React.Fragment>
      )}
    </ProductConsumer>
  );
}
