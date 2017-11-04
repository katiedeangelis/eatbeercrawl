// Here is the key for the Zomato API = cd1577ead710b996f1a2d0ecae1431dd
var map;
var infowindow;
var markersArray = [];

function initMap() {
    // Map options
    var options = {
        zoom: 8,
        center: {
            lat: 43.9654,
            lng: -70.8227
        }
    }

    // New map
    map = new google.maps.Map(document.getElementById('map'), options);

    $(".submit-parameters").click(searchCrawlLocations)

    infowindow = new google.maps.InfoWindow();

}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    markersArray.push(marker);

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

function searchCrawlLocations() {
    for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
    }
    markersArray = [];
    var searchType = $(".search-type").val();
    var searchLocation = $(".location-search").val();
    console.log(searchType);
    console.log(searchLocation);
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({
        'address': searchLocation
    }, function (results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            console.log(latitude);
            console.log(longitude);

            var locationSearch = {
                location: {
                    lat: latitude,
                    lng: longitude
                },
                radius: 8000,
                query: searchType
            };

            map.setCenter({
                lat: latitude,
                lng: longitude
            });
            map.setZoom(14);
            var service = new google.maps.places.PlacesService(map);
            service.textSearch(locationSearch, callback)




        }
    });
}