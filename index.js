firebase.initializeApp({
  apiKey: "AIzaSyBLnW_IOQi86qUsiG3hvXugktWs5Yb7dPw",
  authDomain: "hacktwitchtuesday.firebaseapp.com",
  databaseURL: "https://hacktwitchtuesday.firebaseio.com",
  projectId: "hacktwitchtuesday",
  storageBucket: "hacktwitchtuesday.appspot.com",
  messagingSenderId: "301843289848",
  appId: "1:301843289848:web:3b6ceadb0fe28575"
});

var provider = new firebase.auth.GithubAuthProvider();

firebase
  .auth()
  .signInWithPopup(provider)
  .then(function(result) {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;

    console.log(user);
    // ...
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

// ui.start("#firebaseui-auth-container", {
//   signInOptions: [
//     // List of OAuth providers supported.
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//     firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//     firebase.auth.GithubAuthProvider.PROVIDER_ID
//   ]
//   // Other config options...
// });
