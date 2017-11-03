// Here is the key for the Zomato API = cd1577ead710b996f1a2d0ecae1431dd
function initMap() {
    var uluru = { lat: -25.363, lng: 131.044 };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: uluru
    })
}


//
var config = {
    apiKey: "AIzaSyCDhMwA7HwWOm6dnbNZuYkeMI3qNDy3tu4",
    authDomain: "eatbeercrawl.firebaseapp.com",
    databaseURL: "https://eatbeercrawl.firebaseio.com",
    projectId: "eatbeercrawl",
    storageBucket: "eatbeercrawl.appspot.com",
    messagingSenderId: "598266543914"
};
firebase.initializeApp(config);


var database = firebase.database();


database.ref().on("value", function(snapshot) {
    console.log(snapshot.val());
})







// The api call for the authenitcation for the  <link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/2.4.1/firebaseui.css" />


//Create a 
// var provider = new firebase.auth.GoogleAuthProvider();