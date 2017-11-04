// Here is the key for the Zomato API = cd1577ead710b996f1a2d0ecae1431dd
function initMap() {
    // Map options
    var options = {
        zoom: 14,
        center: {
            lat: 43.0718,
            lng: -70.7626
        }
    }

    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);

    // Content box for marker
    var contentString = '<div id="content">' +
    '<h6>Rira Irish Pub</h6>' +
    '</div>';

    // Content for info window
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    // Add marker
    var marker = new google.maps.Marker({
        position: {
            lat: 43.076951,
            lng: -70.757214
        },
        map: map,
        title: 'Rira Irish Pub Test'
    });

    // Add even listener for marker click
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
}