import React from "react";
import { storage } from "../firebase";
import { ButtonContainer } from "./Button";
import { useForm } from "react-hook-form";
import firebase from "../firebase";
import { ModalContainer } from "./Modal";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";

export default function CargaDatos() {
  const [image, setImage] = React.useState(["2"]);
  const db = firebase.firestore();
  const { register, handleSubmit, errors } = useForm();
  const [modelo, setModelo] = React.useState();
  const [esIphone, setEsIphone] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [cargaEnProceso, setCargaEnProceso] = React.useState(false);
  const [cargaExitosa, setCargaExitosa] = React.useState(false);
  const [cargaFallida, setCargaFallida] = React.useState(false);

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

  const handleModelo = (e) => {
    setModelo(e.target.value);
  };

  const handleOther = (e) => {
    const element = document.getElementById("otroModelo");
    if (e.target.value === "Otro") {
      element.style.display = "inline";
    } else {
      element.style.display = "none";
    }
  };

  const handleIphone = (e) => {
    e.target.value === "iphone" ? setEsIphone(true) : setEsIphone(false);
  };

  const handleCambiosPorModelo = (e) => {
    handleModelo(e);
    handleIphone(e);
  };

  const handleSeleccionFoto = (e) => {
    if (e.target.files[0]) {
      if (e.target.name === "archivo1") {
        const img = e.target.files[0];
        const tempImgArray = [...image];
        tempImgArray[0] = img;
        setImage(tempImgArray);
      } else {
        const img = e.target.files[0];
        const tempImgArray = [...image];
        tempImgArray.push(img);
        setImage(tempImgArray);
      }
    }
  };

  const uploadImgToStorage = (data) => {
    let counter = image.length;
    let tempArray = [];
    image.forEach((img) => {
      const uploadTask = storage
        .ref(`images/${data.whatsapp}/${data.title}/${img.name}`)
        .put(img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          let urlPath = await storage
            .ref(`images/${data.whatsapp}/${data.title}`)
            .child(img.name)
            .getDownloadURL();
          tempArray[image.indexOf(img)] = urlPath;
          counter--;
          if (counter === 0) {
            productoADatabase(data, tempArray);
          }
          return urlPath;
        }
      );
    });
  };

  const productoADatabase = (data, array) => {
    db.collection("cargasDeUsuarios")
      .add({
        price: data.precio,
        title: data.title,
        img: array,
        info: data.info,
        usd: data.moneda === "dolar" ? true : false,
        whatsapp: data.whatsapp.toString(),
        instagram: data.instagram,
        marca: data.marca,
        modelo: data.modelo,
        otroModelo: data.modelo === "Otro" ? data.otroModelo : "",
        capacidad: data.capacidad,
        bateria: data.bateria ? data.bateria : "",
        fecha: new Date(),
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        setCargaExitosa(true);
        setCargaEnProceso(false);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
        setCargaFallida(true);
        setCargaEnProceso(false);
      });
  };

  const submit = async (data) => {
    const botonSubmit = document.getElementById("buttonSubmit");
    botonSubmit.setAttribute("disabled", true);
    setShowModal(true);
    setCargaEnProceso(true);
    uploadImgToStorage(data);
  };

  React.useEffect(() => {});

  return (
    <div className="container text-left">
      <br />
      {/* Rows de Inputs */}
      <form onSubmit={handleSubmit(submit)}>
        <div className="form-row justify-content-center">
          <div className="form-group col-md-6">
            <label htmlFor="title">Título</label>
            <input
              ref={register({ required: true, minLength: 5 })}
              id="title"
              name="title"
              type="text"
              className="form-control"
            />
            {errors.title && errors.title.type === "required" && (
              <p>Por favor ingresa el título</p>
            )}
            {errors.title && errors.title.type === "minLength" && (
              <p>El título debe tener al menos 5 caracteres</p>
            )}
          </div>
        </div>
        <div className="form-row justify-content-center">
          <div className="form-group col-md-6">
            <label htmlFor="marca">Modelo </label>
            <div className="form-row">
              <div className="form-group col-md-4">
                <select
                  ref={register({ required: true })}
                  id="marca"
                  name="marca"
                  className="form-control"
                  onChange={handleCambiosPorModelo}
                  defaultValue={""}
                >
                  <option value="" disabled>
                    Elige la marca
                  </option>
                  <option value="iphone">iPhone</option>
                  <option value="samsung">Samsung</option>
                  <option value="motorola">Motorola</option>
                  <option value="xiaomi">Xiaomi</option>
                  <option value="lg">LG</option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <select
                  ref={register({ required: true })}
                  name="modelo"
                  className="form-control"
                  onChange={handleOther}
                >
                  {!modelo
                    ? null
                    : modelos[modelo].map((item) => {
                        return (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        );
                      })}
                </select>
              </div>
              <div className="form-group col-md-4">
                <input
                  ref={register()}
                  placeholder="Ingresá el modelo"
                  className="form-control"
                  type="text"
                  name="otroModelo"
                  id="otroModelo"
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="form-row justify-content-center">
          <div className="form-group col-md-6">
            <label htmlFor="precio">Precio</label>
            <div className="form-row">
              <div className="form-group col-8 col-md-6">
                <input
                  ref={register({ required: true })}
                  id="precio"
                  className="form-control"
                  name="precio"
                  type="number"
                ></input>
                {errors.precio && errors.precio.type === "required" && (
                  <p>Ingresa el precio</p>
                )}
              </div>
              <div className="form-group col-4 col-md-3 ">
                <select
                  ref={register({ required: true })}
                  name="moneda"
                  className="form-control"
                >
                  <option value="dolar">US$</option>
                  <option value="peso">$</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="form-row justify-content-center">
          <div className="form-group col-md-6">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="capacidad">Capacidad</label>
                <div className="input-group">
                  <input
                    ref={register({ required: true, minLength: 2 })}
                    id="capacidad"
                    name="capacidad"
                    type="number"
                    className="form-control"
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">GB</span>
                  </div>
                </div>
                {errors.capacidad && errors.capacidad.type === "minLength" && (
                  <p>Mínimo 2 caracteres</p>
                )}
              </div>

              {!esIphone ? null : (
                <div id="divBateria" className="form-group col-md-6">
                  <label htmlFor="bateria">% de Batería</label>
                  <div className="input-group">
                    <input
                      ref={register({ required: true, maxLength: 3 })}
                      id="bateria"
                      name="bateria"
                      type="number"
                      className="form-control"
                    />
                    <div className="input-group-append">
                      <span className="input-group-text" id="basic-addon1">
                        %
                      </span>
                    </div>
                  </div>
                  {errors.bateria && errors.bateria.type === "required" && (
                    <p>Ingresa el % de batería</p>
                  )}
                  {errors.bateria && errors.bateria.type === "maxLength" && (
                    <p>Ingresa el % de batería</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* TEXT AREA - INFO DEL PRODUCTO  */}
        <div className="form-row justify-content-center">
          <div className="form-group col-md-6">
            <label htmlFor="info">Descripción del producto</label>
            <textarea
              ref={register({ required: true, minLength: 20 })}
              id="info"
              name="info"
              cols="30"
              rows="10"
              className="form-control"
            ></textarea>
            {errors.info && errors.info.type === "required" && (
              <p>Ingresa una descripción del producto</p>
            )}
            {errors.info && errors.info.type === "minLength" && (
              <p>La descripción debe tener al menos 20 caracteres</p>
            )}
          </div>
        </div>
        {/* Carga de imágenes */}
        <div className="form-row justify-content-center">
          <div className="form-group col-md-6">
            <label htmlFor="archivo1">Cargá imágenes del producto</label>
            <div className="form-row">
              <div className="form-group col-md-4">
                <input
                  ref={register({ required: true })}
                  id="archivo1"
                  name="archivo1"
                  type="file"
                  size="10"
                  onChange={handleSeleccionFoto}
                />
              </div>
              <div className="form-group col-md-4">
                <input
                  name="archivo2"
                  type="file"
                  onChange={handleSeleccionFoto}
                />
              </div>
              <div className="form-group col-md-4">
                <input
                  name="archivo3"
                  type="file"
                  onChange={handleSeleccionFoto}
                />
              </div>
              <div className="form-group col-md-4">
                <input
                  name="archivo4"
                  type="file"
                  onChange={handleSeleccionFoto}
                />
              </div>
            </div>
          </div>
        </div>
        {/* DATOS DEL CLIENTE */}
        <div className="form-row justify-content-center">
          <div className="form-group col-md-6">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="whatsapp">Whatsapp</label>
                <input
                  ref={register({ required: true })}
                  id="whatsapp"
                  name="whatsapp"
                  type="text"
                  className="form-control"
                />
                {errors.title && errors.title.type === "required" && (
                  <p>Ingresa tu número de teléfono</p>
                )}
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="instagram">Instagram</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">@</div>
                  </div>
                  <input
                    id="instagram"
                    ref={register()}
                    name="instagram"
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* BOTON SUBMIT */}
        <div className="form-row justify-content-center">
          <div className="col-md-6">
            <ButtonContainer className="float-right">
              <input
                id="buttonSubmit"
                type="submit"
                value="Publicar"
                style={{ display: "block" }}
              />
            </ButtonContainer>
          </div>
        </div>
      </form>

      {/* MODAL MIENTRAS CARGA LA PUBLICACION */}
      {!showModal ? null : (
        <ModalContainer>
          <div className="container">
            <div className="row justify-content-center">
              <div id="modal" className="col-10 col-md-6 text-center">
                <div
                  className="row justify-content-center"
                  style={{
                    boxShadow: "0px 0px 34px 21px rgba(61,61,61,1)",
                  }}
                >
                  {/* PUBLIACIÓN EN PROCESO */}
                  {!cargaEnProceso ? null : (
                    <div className="p-5">
                      <h5>Aguarda un instante</h5>
                      <Spinner
                        id="spinner"
                        className="my-3"
                        animation="border"
                        variant="dark"
                      />
                      <h5>Tu publicación se está procesando</h5>
                    </div>
                  )}

                  {/* PUBLICACIÓN EXITOSA */}
                  {!cargaExitosa ? null : (
                    <div className="p-5">
                      <h5>Todo listo!</h5>
                      <br />
                      <h5>
                        Tu publicación estará disponible en las próximas horas!
                      </h5>

                      <Link to="/">
                        <ButtonContainer>Aceptar</ButtonContainer>
                      </Link>
                    </div>
                  )}

                  {/* PUBLICACIÓN FALLIDA */}
                  {!cargaFallida ? null : (
                    <div className="p-5">
                      <h5>{`Ups... Algo falló :(`}</h5>
                      <br />
                      <h5>Inténtalo de nuevo en unos instantes</h5>
                      <Link to="/">
                        <ButtonContainer>Aceptar</ButtonContainer>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ModalContainer>
      )}
    </div>
  );
}
