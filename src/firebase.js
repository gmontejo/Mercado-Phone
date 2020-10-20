import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firebase-auth";
import "firebase/firestore";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "*******************************",
  authDomain: "mercadophone-27b13.firebaseapp.com",
  databaseURL: "https://mercadophone-27b13.firebaseio.com",
  projectId: "mercadophone-27b13",
  storageBucket: "mercadophone-27b13.appspot.com",
  messagingSenderId: "********************",
  appId: "**********************",
  measurementId: "**********************",
};

firebase.initializeApp(firebaseConfig);

const analytics = firebase.analytics();

const storage = firebase.storage();

export { storage, analytics, firebase as default };
