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

// Create a reference to 'images/mountains.jpg'
var soundsRef = storageRef.child("sounds");

function getRandomTopherGatesColor() {
  const h = Math.floor(Math.random() * 360);
  const s = "100%";
  const l = "60%";
  return "hsl(" + h + "," + s + "," + l + ")";
}
const bodyEl = document.querySelector("body");

// TODO: memory leak...

function makeBalloon() {
  const tophergatesColor = getRandomTopherGatesColor();
  const top = "calc(100% + " + Math.floor(Math.random() * 51) + "%)";
  const left = Math.floor(Math.random() * 101) + "%";
  const delay = Math.floor(Math.random() * 5000);
  const balloonContainerEl = document.createElement("div");
  balloonContainerEl.style.top = top;
  balloonContainerEl.style.left = left;
  const balloonEl = document.createElement("div");
  balloonEl.style.backgroundColor = tophergatesColor;
  const balloonKnotEl = document.createElement("div");
  balloonKnotEl.style.borderBottom = "16px solid " + tophergatesColor;
  balloonContainerEl.classList.add("balloon-container");
  setTimeout(function () {
    balloonContainerEl.classList.add("animate");
  }, delay);
  balloonEl.classList.add("balloon");
  balloonKnotEl.classList.add("balloon-knot");
  balloonContainerEl.append(balloonEl, balloonKnotEl);
  bodyEl.append(balloonContainerEl);
  balloonContainerEl.addEventListener("transitionend", function () {
    balloonContainerEl.remove();
  });
}

let areBalloonsRunning = false;
function releaseMawbstersBalloons() {
  if (!areBalloonsRunning) {
    areBalloonsRunning = true;
    for (let i = 1; i <= 10; i++) {
      makeBalloon();
    }
    setTimeout(() => {
      areBalloonsRunning = false;
    }, 10000);
  }
}

db.collection("actions")
  .where("type", "==", "balloons")
  .onSnapshot(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      releaseMawbstersBalloons();
      db.collection("actions")
        .doc(doc.id)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    });
  });

db.collection("actions")
  .where("type", "==", "sound")
  .onSnapshot(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      console.log(doc.data());
      soundsRef
        .child(doc.data().name)
        .getDownloadURL()
        .then(function (url) {
          console.log("URL: ", url);
          var audio = new Audio(url);
          audio.play();

          db.collection("actions")
            .doc(doc.id)
            .delete()
            .then(function () {
              console.log("Document successfully deleted!");
            })
            .catch(function (error) {
              console.error("Error removing document: ", error);
            });
        })
        .catch(function (error) {
          console.error(error);
        });
    });
  });
