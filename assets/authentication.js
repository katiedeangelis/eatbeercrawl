 var config = {
     apiKey: "AIzaSyCDhMwA7HwWOm6dnbNZuYkeMI3qNDy3tu4",
     authDomain: "eatbeercrawl.firebaseapp.com",
     databaseURL: "https://eatbeercrawl.firebaseio.com",
     projectId: "eatbeercrawl",
     storageBucket: "eatbeercrawl.appspot.com",
     messagingSenderId: "598266543914",
 };






 const txtEmail = $("#txtEmail");
 const txtPassword = $("#txtPassword");
 const btnLogin = $("#btnLogin");
 const btnSignUp = $("#btnSignUp");
 const btnLogout = $("#btnLogout");

 const user = firebase.auth().currentUser;

 // This is the login button.    
 $("#btnlogin").on("click", function() {
     const password = $("#txtPassword").val().trim();
     const email = $("#txtEmail").val().trim();
     // This  saves the firebase.auth() ability to just be able to call it below.
     const auth = firebase.auth();
     // Sign in with email and password is a method that takes two arguemnts and returns a promise
     const promise = auth.signInWithEmailAndPassword(email, password);
     //  The promise that we get back has a message property, if you get back an error, show me the error. 
     promise.catch(e => console.log(e.message));
 })

 $("#btnSignUp").on("click", function() {
     const password = $("#txtPassword").val().trim();
     const email = $("#txtEmail").val().trim();
     const auth = firebase.auth();
     const promise = auth.createUserWithEmailAndPassword(email, password);
     promise.catch(e => console.log(e.message))
     var user = firebase.auth().currentUser;



     user.sendEmailVerification().then(function() {
         console.log("The email has been sent")
     }).catch(function(error) {
         console.log(error);
     });
 })

 $("#btnLogOut").on("click", function() {
     firebase.auth().signOut();

 })



 // add a realtime listener.
 //  This allows use to use firebase for the authentication. the onAuthStateChanged Method is taking the firebase user and is loging everytime there is some form of state changed within the user
 // E.x. if the user is logged in or logged out.
 firebase.auth().onAuthStateChanged(firebaseUser => {
     if (firebaseUser) {
         console.log(firebaseUser);
         console.log("The user is signed in");
         btnLogout.css("display", "inline");

     } else {
         console.log('not logged in');
         btnLogout.css("display", "none");
     }
 });