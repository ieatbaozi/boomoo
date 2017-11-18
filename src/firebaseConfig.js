import Firebase from 'firebase'


var config = {
  apiKey: "AIzaSyBsWXyqcdVXQdRpOqAxaeoXLr20NH1sbUs",
  authDomain: "bookmarker-405.firebaseapp.com",
  databaseURL: "https://bookmarker-405.firebaseio.com",
  projectId: "bookmarker-405",
  storageBucket: "bookmarker-405.appspot.com",
  messagingSenderId: "263998915968"
  };

//firebase.initializeApp(config);
const firebaseApp = Firebase.initializeApp(config);
const db = firebaseApp.database();

export {firebaseApp, db};