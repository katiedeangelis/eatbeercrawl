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
 var currentUser = firebase.auth().currentUser;

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
     window.reload();
     $(".userInformation").empty();
     firebase.auth().signOut();
     currentUser = null;
 })

 firebase.auth().onAuthStateChanged(function(user) {
     if (user) {
         currentUser = user;
         $("#btnLogout").show();
         $("#display_name").html("<h3>" + user.displayName + "</h3>");
         $("#user-profile-pic").attr("src", user.photoURL);
         $("#btnSignUp, #btnLogin").hide();
     } else {
         $("#userIsLoggedIn").empty();
         $("#btnLogout").hide();
         $("#btnSignUp, #btnLogin").show();
     }
 });
 // add a realtime listener.
 //  This allows use to use firebase for the authentication. the onAuthStateChanged Method is taking the firebase user and is loging everytime there is some form of state changed within the user
 // E.x. if the user is logged in or logged out.

 function save_this_shit(successCallBack) {
     console.log("YOU CALLED THE FUNCTION");
     db.collection("trips").add({
             creator: firebase.auth().currentUser.displayName,
             creatorEmail: firebase.auth().currentUser.email,
             type: $("#search-type").val(),
             main_location: $("#search-location").val(),
             number: $("#num_ques").val()
         })
         .then(function(docRef) {
             console.log("Document written with ID: ", docRef.id);
             successCallBack(docRef.id);
         })
         .catch(function(error) {
             console.error("Error adding document: ", error);
         });

 }


 $("#the_submit_button").on("click", function(event) {
     event.preventDefault();
     save_this_shit(function(docRef) {
         window.location = window.origin + "/build-page3.html#" + docRef;
     });
 });