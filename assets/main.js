// Here is the key for the Zomato API = cd1577ead710b996f1a2d0ecae1431dd
function initMap() {
    var uluru = { lat: -25.363, lng: 131.044 };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: uluru
    })
}