import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";
import styled from "styled-components";
import ModalContacto from "./ModalContacto";
import { analytics } from "../firebase";

export default function Details() {
  const [openModalContacto, setOpenModalContacto] = React.useState(false);

  React.useEffect(() => {
    analytics.logEvent("Entraron a Detalles");
    return () => {
      setOpenModalContacto(false);
    };
  }, []);

  const handleComprarButton = () => {
    analytics.logEvent("Tocaron botón Comprar");
    setOpenModalContacto(true);
  };

  return (
    <ProductConsumer>
      {(value) => {
        const { handleMiniImg } = value;
        const {
          img,
          info,
          title,
          price,
          marca,
          usd,
          capacidad,
          modelo,
          SegundoPrecio,
          otroModelo,
          whatsapp,
          bateria,
        } = value.detailProduct;

        return (
          <div className="d-flex flex-grow-1">
            <div className="container py-1 flex-grow-1">
              {/* title */}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-1">
                  <h1>{title}</h1>
                </div>
              </div>
              {/* end title */}
              {/* product info */}
              <div className="row">
                {/* product img */}
                <div className="col-12 mx-auto col-md-6 my-1">
                  <div
                    className="d-flex justify-content-center"
                    style={{ maxHeight: "400px" }}
                  >
                    <BigImg
                      id="displayImage"
                      src={img[0]}
                      alt="product"
                      className="img-fluid"
                    />
                  </div>
                  {/* imagenes pequeñas */}

                  <div className="row justify-content-center">
                    <HiddenScrollbar className="overflow-auto">
                      <div
                        style={{
                          width: "max-content",
                          maxHeight: "110px",
                        }}
                      >
                        {img.map((foto) => {
                          return (
                            <MiniImg
                              key={img.indexOf(foto)}
                              onClick={() => handleMiniImg(foto)}
                              src={foto}
                              alt="img-pequeña"
                            />
                          );
                        })}
                      </div>
                    </HiddenScrollbar>
                  </div>
                </div>

                {/* product text */}
                <div className="col-10 mx-auto col-md-6 my-1">
                  <h2 className="text-capitalize">{`modelo: ${marca} ${
                    modelo === "Otro" ? otroModelo : modelo
                  } ${capacidad}GB`}</h2>
                  <h4 className="text-blue text-capitalize">
                    <strong>
                      precio:{" "}
                      <span>
                        {SegundoPrecio == null
                          ? usd
                            ? "US$ " + price
                            : "$ " + price
                          : `US$ ${price} / $ ${SegundoPrecio}`}
                      </span>{" "}
                    </strong>
                  </h4>
                  {marca !== "iphone" ? null : (
                    <h4 className="text-blue text-capitalize">{`Batería: ${bateria} %`}</h4>
                  )}

                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    Especificaciones del teléfono:
                  </p>
                  <p className="text-muted lead">{info}</p>
                  {/* buttons */}
                  <Link to="/">
                    <ButtonContainer>Volver a la tienda</ButtonContainer>{" "}
                  </Link>
                  <ButtonContainer cart onClick={handleComprarButton}>
                    Comprar
                  </ButtonContainer>
                </div>
                {/* end product text */}
              </div>
              {openModalContacto ? <ModalContacto /> : null}
            </div>
          </div>
        );
      }}
    </ProductConsumer>
  );
}

const MiniImg = styled.img`
  max-height: 100px;
  width: auto;
  margin: 5px;
  box-shadow: 0px 0px 5px 2px rgba(61, 61, 61, 1);
  cursor: pointer;
`;

const BigImg = styled.img`
  height: 400px !important;
  object-fit: scale-down;
  border-radius: 5%;
`;

const HiddenScrollbar = styled.div`
  ::-webkit-scrollbar {
    width: 0px;
  }
`;
