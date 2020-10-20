import React from "react";
import { ProductConsumer } from "../context";
import { ModalContainer } from "./Modal";
import { ButtonContainer } from "./Button";
import { Link } from "react-router-dom";
import { analytics } from "../firebase";

export default function ModalContacto() {
  const handleBotonInsta = () => {
    analytics.logEvent("Se comunicaron por Instagram");
  };
  const handleBotonWhatsapp = () => {
    analytics.logEvent("Se comunicaron por Whatsapp");
  };

  return (
    <ProductConsumer>
      {(value) => {
        const { modalContactoOpen, closeModalContacto } = value;
        const item = value.detailProduct;

        if (!modalContactoOpen) {
          return null;
        } else {
          return (
            <ModalContainer>
              <div className="container">
                <div className="row">
                  <div
                    id="modal"
                    className="col-10 mx-auto text-center col-md-6 p-4"
                  >
                    <div className="text-center pb-3">
                      <h2>{item.title}</h2>
                    </div>
                    <div className="row">
                      {/* IMAGEN A LA IZQUIERDA */}
                      <div className="col-8 mx-auto col-md-4 p-1">
                        <img
                          src={item.img[0]}
                          alt="imagen venta"
                          className="img-fluid"
                        />
                      </div>
                      {/* INFO DEL CONTACTO */}
                      <div className="col-12 col-md-8 mx-auto text-left pb-3">
                        <h5 className="text-center mx-auto pb-3">
                          Contactate con el vendedor!
                        </h5>

                        {item.whatsapp === "" ? null : (
                          <h5>
                            Whatsapp: {item.whatsapp} {"->"}
                            <a
                              href={`http://wa.me/549${item.whatsapp}`}
                              target="_blank"
                              className="ml-2"
                              rel="noopener noreferrer"
                            >
                              <i
                                onClick={handleBotonWhatsapp}
                                className="fab fa-whatsapp"
                              ></i>
                            </a>
                          </h5>
                        )}

                        {item.instagram === "" ? null : (
                          <h5>
                            Instagram: @{item.instagram} {"->"}
                            <a
                              href={`http://instagram.com/${item.instagram}`}
                              target="_blank"
                              className="ml-2"
                              rel="noopener noreferrer"
                            >
                              <i
                                onClick={handleBotonInsta}
                                className="fab fa-instagram"
                              ></i>
                            </a>
                          </h5>
                        )}
                      </div>
                    </div>
                    {/* Botón para volver a la tienda */}
                    <Link to="/">
                      <ButtonContainer onClick={closeModalContacto}>
                        volver a la tienda
                      </ButtonContainer>
                    </Link>
                  </div>
                </div>
              </div>
            </ModalContainer>
          );
        }
      }}
    </ProductConsumer>
  );
}
