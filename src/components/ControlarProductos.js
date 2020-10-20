import React from "react";
import firebase from "../firebase";
import { storage } from "../firebase";

export default function ControlarProductos() {
  const db = firebase.firestore();
  const [arrayAControlar, setArrayAControlar] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  let tempArrayProductos = [];
  const [itemDeleted, setItemDeleted] = React.useState(true);

  React.useEffect(() => {
    const fetchData = () =>
      db
        .collection("cargasDeUsuarios")
        .get()
        .then((querySnapshot) => {
          let tempProducto = {};
          querySnapshot.forEach((doc) => {
            tempProducto = { id: doc.id, ...doc.data() };
            tempArrayProductos.push(tempProducto);
          });
          setArrayAControlar(tempArrayProductos);
          setIsLoading(false);
        });
    fetchData();
  }, [itemDeleted]);

  const handleAceptarPublicacion = (id, item) => {
    db.collection("publicacionesActivas").doc(id).set(item);
    db.collection("cargasDeUsuarios")
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
        setItemDeleted(!itemDeleted);
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

  const handleEliminarPublicacion = (id, item) => {
    db.collection("cargasDeUsuarios")
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
        setItemDeleted(!itemDeleted);
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });

    const ref = storage.ref(`images/${item.whatsapp}/${item.title}`);
    ref
      .listAll()
      .then((dir) => {
        dir.items.forEach((fileRef) => {
          var dirRef = firebase.storage().ref(fileRef.fullPath);
          dirRef.getDownloadURL().then(function (url) {
            var imgRef = firebase.storage().refFromURL(url);
            imgRef
              .delete()
              .then(function () {
                // File deleted successfully
                console.log("success");
              })
              .catch(function (error) {
                // There has been an error
                console.log(error);
              });
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {isLoading ? (
        <p>cargando datos</p>
      ) : (
        arrayAControlar.map((item) => {
          return (
            <React.Fragment>
              <div key={item.id} className="d-flex container mb-3">
                <img
                  src={item.img[0]}
                  style={{ maxHeight: "300px" }}
                  className="img-container"
                  alt="Foto a controlar"
                />
                <div className="ml-3">
                  <p className="my-2">{item.title}</p>
                  <p className="text-blue font-italic my-2">
                    <span>
                      {item.usd ? "US$ " + item.price : "$ " + item.price}
                    </span>
                  </p>
                  <p>{item.info}</p>
                </div>

                <button onClick={() => handleAceptarPublicacion(item.id, item)}>
                  cargar publicacion
                </button>

                <button
                  onClick={() => handleEliminarPublicacion(item.id, item)}
                >
                  eliminar publicacion
                </button>
              </div>
            </React.Fragment>
          );
        })
      )}
    </div>
  );
}
