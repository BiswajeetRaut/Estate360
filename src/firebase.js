// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBTxqGuG0PTOrAizot3xjQ1oLx9K31P3Do",
  authDomain: "estate360-521e7.firebaseapp.com",
  projectId: "estate360-521e7",
  storageBucket: "estate360-521e7.appspot.com",
  messagingSenderId: "985805184126",
  appId: "1:985805184126:web:70c5feb1aacd2f25164c2f",
  measurementId: "G-ENQ063CKKY"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const provider= new firebase.auth.GoogleAuthProvider();
  export {auth,provider};
  export default db;