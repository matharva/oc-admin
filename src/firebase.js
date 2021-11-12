import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCda49a3JCXnyOhcmLlv4nnLcXVBbJhg_0",
  authDomain: "oculus2022-75997.firebaseapp.com",
  projectId: "oculus2022-75997",
  storageBucket: "oculus2022-75997.appspot.com",
  messagingSenderId: "379210659404",
  appId: "1:379210659404:web:c5c2b6c56af7a895f866e9",
  measurementId: "G-Q0M6S2CCW0",
});

export const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export const auth = app.auth();
export const projectStorage = firebase.storage();
export const projectFirestore = firebase.firestore();

export default app;
