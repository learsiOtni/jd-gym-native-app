import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlvy7ekN7c3FV1wuja0R4ZqL6juh7kGCg",
  authDomain: "jd-gym-app.firebaseapp.com",
  databaseURL: "https://jd-gym-app.firebaseio.com",
  projectId: "jd-gym-app",
  storageBucket: "jd-gym-app.appspot.com",
  messagingSenderId: "658388047441",
  appId: "1:658388047441:web:6f93947da8ed099e2b4a70",
  measurementId: "G-EGZF1PYEQF"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const db = app.database();

export { auth, app, db };