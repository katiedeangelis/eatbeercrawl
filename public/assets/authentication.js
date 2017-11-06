 var config = {
     apiKey: "AIzaSyCDhMwA7HwWOm6dnbNZuYkeMI3qNDy3tu4",
     authDomain: "eatbeercrawl.firebaseapp.com",
     databaseURL: "https://eatbeercrawl.firebaseio.com",
     projectId: "eatbeercrawl",
     storageBucket: "eatbeercrawl.appspot.com",
     messagingSenderId: "598266543914",
 };

 firebase.initializeApp(config);
 var provider = new firebase.auth.GoogleAuthProvider();
 const txtEmail = $("#txtEmail");
 const txtPassword = $("#txtPassword");
 const btnLogin = $("#btnLogin");
 const btnSignUp = $("#btnSignUp");
 const btnLogout = $("#btnLogout");
 const currentUser = firebase.auth().currentUser;

 // This is the login button.    
 $("#btnLogin").on("click", function() {
     console.log("clicked");
     firebase.auth().signInWithRedirect(provider);
 })

 $("#btnSignUp").on("click", function() {
     firebase.auth().signUpWithRedirect(provider);
     sendEmailVerification();
 })

 $("#btnLogout").on("click", function() {
     console.log("clicked");
     firebase.auth().signOut();
 })

 firebase.auth().onAuthStateChanged(function(user) {
     if (user) {
         $("#user_name").html("<h1>" + user.displayName + "</h1>");
         $("#btnLogout").show();
         $("#btnSignUp, #btnLogin").hide();
     } else {
         $("#btnLogout").hide();
         $("#btnSignUp, #btnLogin").show();
     }
 });
 // add a realtime listener.
 //  This allows use to use firebase for the authentication. the onAuthStateChanged Method is taking the firebase user and is loging everytime there is some form of state changed within the user
 // E.x. if the user is logged in or logged out.
 function sendEmailVerification() {
     firebase.auth().currentUser.sendEmailVerification().then(function() {
         alert('Email Verification Sent!');
     });
 }