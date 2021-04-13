import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCNvoupwmOWUQwOtXiRbLm99Gx2Zh7Tvv8",
  authDomain: "expense-tracker-66187.firebaseapp.com",
  projectId: "expense-tracker-66187",
  storageBucket: "expense-tracker-66187.appspot.com",
  messagingSenderId: "811805631821",
  appId: "1:811805631821:web:3c404c74d47d506a52c304",
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
