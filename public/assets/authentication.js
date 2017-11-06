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
 console.log(provider);


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
     //  const password = $("#txtPassword").val().trim();
     //  const email = $("#txtEmail").val().trim();
     //  // This  saves the firebase.auth() ability to just be able to call it below.
     //  const auth = firebase.auth();
     //  // Sign in with email and password is a method that takes two arguemnts and returns a promise
     //  const promise = auth.signInWithEmailAndPassword(email, password);

     //  //  The promise that we get back has a message property, if you get back an error, show me the error. 
     //  promise.catch(e => console.log(e.message));
 })

 $("#btnSignUp").on("click", function() {
     const password = $("#txtPassword").val().trim();
     const email = $("#txtEmail").val().trim();
     const auth = firebase.auth();
     const promise = auth.createUserWithEmailAndPassword(email, password);
     promise.catch(e => console.log(e.message));
     sendEmailVerification();
 })

 $("#btnLogout").on("click", function() {
     console.log("clicked");
     firebase.auth().signOut();
 })

 firebase.auth().onAuthStateChanged(function(user) {
     if (user) {
         $("body").append("<h1>" + user.email + "</h1>");
         $("#btnLogout").show();
         $("#btnSignUp, #btnLogin").hide();



     }
 })



 // add a realtime listener.
 //  This allows use to use firebase for the authentication. the onAuthStateChanged Method is taking the firebase user and is loging everytime there is some form of state changed within the user
 // E.x. if the user is logged in or logged out.
 function sendEmailVerification() {
     firebase.auth().currentUser.sendEmailVerification().then(function() {
         alert('Email Verification Sent!');
     });
 }