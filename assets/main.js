// Here is the key for the Zomato API = cd1577ead710b996f1a2d0ecae1431dd
function initMap() {
    var options = {
        zoom: 8,
        center: {
            lat: 43.0718,
            lng: -70.7626
        }
    }

    var map = new google.maps.Map(document.getElementById('map'), options);
}