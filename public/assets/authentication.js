 var config = {
     apiKey: "AIzaSyCDhMwA7HwWOm6dnbNZuYkeMI3qNDy3tu4",
     authDomain: "eatbeercrawl.firebaseapp.com",
     databaseURL: "https://eatbeercrawl.firebaseio.com",
     projectId: "eatbeercrawl",
     storageBucket: "eatbeercrawl.appspot.com",
     messagingSenderId: "598266543914",
 };

 firebase.initializeApp(config);
 var db = firebase.firestore();

 var now = moment();
 console.log(now);

 var provider = new firebase.auth.GoogleAuthProvider();
 //  var git_hub_provider = new firebase.auth.GithubAuthProvider();
 const txtEmail = $("#txtEmail");
 const txtPassword = $("#txtPassword");
 const btnLogin = $("#btnLogin");
 const btnSignUp = $("#btnSignUp");
 const btnLogout = $("#btnLogout");
 const currentUser = firebase.auth().currentUser;

 // This is the login button.    
 $("#btnLogin").on("click", function() {
     var user = firebase.auth().signInWithRedirect(provider);
     sendUserToFirebase(user);
 })

 $("#btnSignUp").on("click", function() {
     var user = firebase.auth().signUpWithRedirect(provider);
     console.log(user);

 })

 $("#btnLogout").on("click", function() {
     console.log("clicked");
     $(".userInformation").empty();
     firebase.auth().signOut();

 })
 
 firebase.auth().onAuthStateChanged(function(user) {
     if (user) {
         console.log(user);
         $("#user_name").html("<h1>" + user.displayName + "</h1>");
         $("#user_email").html("<p>" + user.email + "</p>")
         $("#btnLogout").show();
         $("#btnSignUp, #btnLogin").hide();
     } else {
         alert("The user is not verified");
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

 function sendUserToFirebase(the_user) {
     console.log("Here is " + the_user.displayName);
     db.collection("users").add({
             user: the_user.displayName,
             email: the_user.email,
             photo: the_user.photoURL
         })
         .then(function(docRef) {
             console.log("Document written with ID: ", docRef.id);
         })
         .catch(function(error) {
             console.error("Error adding document: ", error);
         });
 }