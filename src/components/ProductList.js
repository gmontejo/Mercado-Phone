import React from "react";
import Product from "./Product";
import firebase from "../firebase";
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";
import logoIphone from "../logoIphone.png";
import motoLogo from "../motoLogo.png";
import xiaomiLogo from "../xiaomiLogo.png";
import lgLogo from "../lgLogo.png";
import huaweiLogo from "../huaweiLogo.png";
import samsungLogo from "../samsungLogo.png";

export default function ProductList() {
  const db = firebase.firestore();
  const [arrayProductos, setArrayProductos] = React.useState();
  const [arrayFiltered, setArrayFiltered] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFiltering, setIsFiltering] = React.useState(false);
  const [isFilteringByModel, setIsFilteringByModel] = React.useState(false);

  const [marcaAMostrar, setMarcaAMostrar] = React.useState();
  const [arrayFiltradoPorModelos, setArrayFiltradoPorModelos] = React.useState(
    []
  );
  let tempArrayProductos = [];

  const modelos = {
    iphone: [
      "SE 1ra Gen",
      "7",
      "7 Plus",
      "8",
      "8 Plus",
      "X",
      "XR",
      "XS",
      "XS Max",
      "11",
      "11 Pro",
      "11 Pro Max",
      "SE 2da Gen",
      "Otro",
    ],
    samsung: [
      "J5",
      "J7",
      "A3",
      "A5",
      "A7",
      "A10",
      "A20",
      "A30",
      "A40",
      "A50",
      "A80",
      "S6",
      "S6 Edge+",
      "S7",
      "S7 Edge",
      "S8",
      "S8+",
      "S9",
      "S9+",
      "S10",
      "S10+",
      "Otro",
    ],
    motorola: [
      "G6",
      "G6 Plus",
      "G6 Play",
      "G6 7",
      "G7 Plus",
      "G7 Power",
      "G7 Play",
      "G8 Plus",
      "G8 Play",
      "E5",
      "E5 Plus",
      "E5 Play",
      "Z3 Play",
      "Z4 Play",
      "Otro",
    ],
    xiaomi: [
      "8A",
      "8 Lite",
      "Note 8 ",
      "Note 8 Pro",
      "9",
      "9T",
      "Note 9S",
      "Note 10",
      "Note 10 Pro",
      "Black Shark 2",
      "Otro",
    ],
    lg: [
      "G 6",
      "G 7 ThinQ",
      "G 8 ThinQ",
      "G 8S ThinQ",
      "K 8",
      "K 9",
      "K 10",
      "K 11 Alpha",
      "K 11+",
      "K 20",
      "K 40",
      "K 50",
      "K 50S",
      "Otro",
    ],
    huawei: [
      "P8 Lite",
      "P9",
      "P20 Lite",
      "P20 Pro",
      "P30",
      "Mate 10 Lite",
      "Mate 10 Pro",
      "Mate 20 Lite",
      "Mate 20 Pro",
      "Mate 20 X",
      "Mate 30 Pro",
      "Otro",
    ],
  };

  React.useEffect(() => {
    const fetchData = () => {
      db.collection("publicacionesActivas")
        .orderBy("fecha", "desc")
        .get()
        .then((querySnapshot) => {
          let tempProducto = {};
          querySnapshot.forEach((doc) => {
            tempProducto = { id: doc.id, ...doc.data() };
            tempArrayProductos.push(tempProducto);
          });
          setArrayProductos(tempArrayProductos);
          setIsLoading(false);
        });
    };
    fetchData();
  }, []);

  const filterMarca = (e) => {
    setIsFilteringByModel(false);
    setIsFiltering(true);
    const marca = e.target.id;
    setMarcaAMostrar(marca);
    const showMarca = arrayProductos.filter((item) => item.marca === marca);
    setArrayFiltered(showMarca);
    let openOrClosed = document.getElementById(`${marca}Modelos`).style.display;
    const handleModelos = openOrClosed === "none" ? "block" : "none";
    closeAllModels();
    document.getElementById(`${marca}Modelos`).style.display = handleModelos;
    document.getElementById(`modelosEnCelular`).style.display = "block";
    document.getElementById(`selectFiltroModelos`).value = "";
  };

  const closeAllModels = () => {
    const modelos = document.getElementsByName("modelosPorMarcas");

    modelos.forEach((item) => {
      item.style.display = "none";
    });
  };

  const filterModel = (e) => {
    setIsFilteringByModel(true);
    const modelo =
      e.target.id === "selectFiltroModelos" ? e.target.value : e.target.id;
    const filtradoPorModelos = arrayFiltered.filter(
      (item) => item.modelo === modelo
    );
    setArrayFiltradoPorModelos(filtradoPorModelos);
  };

  const mostrarTodos = () => {
    closeAllModels();
    setIsFiltering(false);
    setIsFilteringByModel(false);

    document.getElementById(`modelosEnCelular`).style.display = "none";
  };

  return (
    <React.Fragment>
      <div className="container-fluid d-md-flex flex-grow-1">
        <div className="row flex-grow-1">
          {isLoading ? null : (
            <React.Fragment>
              {/* SIDEBAR MODELOS EN MEDIUM PARA ARRIBA */}

              <div className="d-none d-md-block col-md-2 bg-dark pt-3 pl-5">
                <H5Filtro onClick={mostrarTodos} className="d-inline-block">
                  Todos
                </H5Filtro>

                <br />
                {/* IPHONE */}
                <H5Filtro
                  onClick={filterMarca}
                  id="iphone"
                  className="d-inline-block"
                >
                  iPhone
                </H5Filtro>
                <br />
                <ListaDeModelos
                  name="modelosPorMarcas"
                  id="iphoneModelos"
                  style={{ display: "none" }}
                >
                  {modelos.iphone.map((item) => {
                    return (
                      <ItemModelo key={item} onClick={filterModel} id={item}>
                        {item}
                      </ItemModelo>
                    );
                  })}
                </ListaDeModelos>
                {/* SAMSUNG */}
                <H5Filtro
                  onClick={filterMarca}
                  id="samsung"
                  className="d-inline-block"
                >
                  Samsung
                </H5Filtro>
                <br />
                <ListaDeModelos
                  name="modelosPorMarcas"
                  id="samsungModelos"
                  style={{ display: "none" }}
                >
                  {modelos.samsung.map((item) => {
                    return (
                      <ItemModelo key={item} onClick={filterModel} id={item}>
                        {item}
                      </ItemModelo>
                    );
                  })}
                </ListaDeModelos>
                {/* MOTOROLA */}
                <H5Filtro
                  onClick={filterMarca}
                  id="motorola"
                  className="d-inline-block"
                >
                  Motorola
                </H5Filtro>
                <br />
                <ListaDeModelos
                  name="modelosPorMarcas"
                  id="motorolaModelos"
                  style={{ display: "none" }}
                >
                  {modelos.motorola.map((item) => {
                    return (
                      <ItemModelo key={item} onClick={filterModel} id={item}>
                        {item}
                      </ItemModelo>
                    );
                  })}
                </ListaDeModelos>
                {/* XIAOMI */}
                <H5Filtro
                  onClick={filterMarca}
                  id="xiaomi"
                  className="d-inline-block"
                >
                  Xiaomi
                </H5Filtro>
                <br />
                <ListaDeModelos
                  name="modelosPorMarcas"
                  id="xiaomiModelos"
                  style={{ display: "none" }}
                >
                  {modelos.xiaomi.map((item) => {
                    return (
                      <ItemModelo key={item} onClick={filterModel} id={item}>
                        {item}
                      </ItemModelo>
                    );
                  })}
                </ListaDeModelos>
                {/* HUAWEI   */}
                <H5Filtro
                  onClick={filterMarca}
                  id="huawei"
                  className="d-inline-block"
                >
                  Huawei
                </H5Filtro>
                <br />
                <ListaDeModelos
                  name="modelosPorMarcas"
                  id="huaweiModelos"
                  style={{ display: "none" }}
                >
                  {modelos.huawei.map((item) => {
                    return (
                      <ItemModelo key={item} onClick={filterModel} id={item}>
                        {item}
                      </ItemModelo>
                    );
                  })}
                </ListaDeModelos>
                {/* LG */}
                <H5Filtro
                  onClick={filterMarca}
                  id="lg"
                  className="d-inline-block"
                >
                  LG
                </H5Filtro>
                <br />
                <ListaDeModelos
                  name="modelosPorMarcas"
                  id="lgModelos"
                  style={{ display: "none" }}
                >
                  {modelos.lg.map((item) => {
                    return (
                      <ItemModelo key={item} onClick={filterModel} id={item}>
                        {item}
                      </ItemModelo>
                    );
                  })}
                </ListaDeModelos>
              </div>

              {/* BARRA CON FOTOS DE MARCAS PARA FILTRAR EN CELULARES */}

              <div className="d-md-none container-fluid mt-2">
                <div className="row">
                  <HiddenScrollbar className="overflow-auto">
                    <div
                      style={{
                        width: "max-content",
                        maxHeight: "70px",
                      }}
                    >
                      <h5 onClick={mostrarTodos} className="d-inline-block">
                        Ver todos
                      </h5>
                      <MiniImg
                        src={logoIphone}
                        onClick={filterMarca}
                        id="iphone"
                      />
                      <MiniImg
                        src={samsungLogo}
                        onClick={filterMarca}
                        id="samsung"
                      />
                      <MiniImg
                        src={motoLogo}
                        onClick={filterMarca}
                        id="motorola"
                      />
                      <MiniImg
                        src={xiaomiLogo}
                        onClick={filterMarca}
                        id="xiaomi"
                      />
                      <MiniImg
                        src={huaweiLogo}
                        onClick={filterMarca}
                        id="huawei"
                      />
                      <MiniImg src={lgLogo} onClick={filterMarca} id="lg" />
                    </div>
                  </HiddenScrollbar>
                </div>

                <div
                  className="row"
                  id="modelosEnCelular"
                  style={{ display: "none" }}
                >
                  <select
                    id="selectFiltroModelos"
                    name="modelos"
                    onChange={filterModel}
                    defaultValue={""}
                  >
                    <option value="" disabled>
                      Filtrar por modelo
                    </option>
                    {!isFiltering
                      ? null
                      : modelos[marcaAMostrar].map((item) => {
                          return (
                            <option key={item} id={item} value={item}>
                              {item}
                            </option>
                          );
                        })}
                  </select>
                </div>
              </div>
            </React.Fragment>
          )}

          {/* LISTA DE PRODUCTOS PRODUCTLIST  */}

          <div className="col-md-10">
            <div className="row justify-content-center">
              {isLoading ? (
                <Spinner
                  id="spinner"
                  className="my-3"
                  animation="border"
                  variant="dark"
                />
              ) : !isFiltering ? (
                arrayProductos.map((producto) => {
                  return <Product key={producto.id} product={producto} />;
                })
              ) : !arrayFiltered.length ? (
                <h3 className="mt-5">Aún no hay lo que estás buscando</h3>
              ) : !isFilteringByModel ? (
                arrayFiltered.map((producto) => {
                  return <Product key={producto.id} product={producto} />;
                })
              ) : !arrayFiltradoPorModelos.length ? (
                <h3 className="mt-5">Aún no hay lo que estás buscando</h3>
              ) : (
                arrayFiltradoPorModelos.map((producto) => {
                  return <Product key={producto.id} product={producto} />;
                })
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer className="text-center">
        <h5>MERCADOPHONE</h5>
      </Footer> */}
    </React.Fragment>
    //   <Product />
  );
}

const H5Filtro = styled.h5`
  &:hover {
    cursor: pointer;
    color: var(--mainWhite);
  }
`;

const MiniImg = styled.img`
  padding: 3px;
  margin: 5px;
  height: 60px;
  width: auto;
  object-fit: scale-down;
  border-radius: 10px;
  box-shadow: 0px 0px 2px 2px rgba(61, 61, 61, 0.3);
  background-color: white;
`;

const HiddenScrollbar = styled.div`
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const ListaDeModelos = styled.ul`
  list-style-type: none;
  margin-bottom: 0px;
`;

const ItemModelo = styled.li`
  &:hover {
    cursor: pointer;
    color: var(--mainWhite);
  }
`;

const Footer = styled.div`
  padding: 1rem;
  height: 4rem;
  color: var(--mainWhite);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(18, 18, 29, 1) 50%,
    rgba(0, 0, 0, 1) 100%
  );
`;
