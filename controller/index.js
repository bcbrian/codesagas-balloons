// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBLnW_IOQi86qUsiG3hvXugktWs5Yb7dPw",
  authDomain: "hacktwitchtuesday.firebaseapp.com",
  databaseURL: "https://hacktwitchtuesday.firebaseio.com",
  projectId: "hacktwitchtuesday",
  storageBucket: "hacktwitchtuesday.appspot.com",
  messagingSenderId: "301843289848",
  appId: "1:301843289848:web:3b6ceadb0fe28575"
});

const db = firebase.firestore();
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = firebase.storage();
// Create a root reference
var storageRef = storage.ref();

firebase.auth().onAuthStateChanged((user) => {
  console.log("hi, user", user);
  if (!user) {
    window.location = "/";
  }

  // Create a reference to 'images/mountains.jpg'
  var soundsRef = storageRef.child("sounds");

  // document.getElementById("file-submit").addEventListener("click", function() {
  //   var file = document.getElementById("file-upload").files[0];

  //   if (file.size > 1024) {
  //     alert("max upload size is 1k");
  //   }

  //   console.log(file);

  //   soundsRef
  //     .child(file.name)
  //     .put(file)
  //     .then(function(snapshot) {
  //       console.log("Uploaded a blob or file!");
  //     });

  //   // Also see .name, .type
  // });

  document
    .getElementById("releaseMawbstersBallons")
    .addEventListener("click", function releaseMawbstersBallons() {
      db.collection("actions")
        .add({
          type: "balloons"
        })
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    });

  // document
  //   .getElementById("playOneOfUSounds")
  //   .addEventListener("click", function playOneOfUSounds() {
  //     db.collection("actions")
  //       .add({
  //         type: "sound",
  //         name: "test.mp3"
  //       })
  //       .then(function(docRef) {
  //         console.log("Document written with ID: ", docRef.id);
  //       })
  //       .catch(function(error) {
  //         console.error("Error adding document: ", error);
  //       });
  //   });

  console.log("HI");
});
