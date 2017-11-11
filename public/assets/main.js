// Here is the key for the Zomato API = cd1577ead710b996f1a2d0ecae1431dd
var map;
var directionsService;
var directionsRenderer;
var infowindow;
var markersArray = [];
var numberOfLocations;
var results;
var currentTripID;
var currentTripInfo;

// $(window).load(function() {
// reload page button
$('#new-crawl').click(function() { window.reload(); }); 
// var autocomplete = new google.maps.places.Autocomplete(document.getElementById("search-location"), { types: ['(cities)'] });

document.getElementById("search-location").addEventListener("focus", initAutocomplete);

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById("search-location")), { types: ['geocode'] });
}
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}


function initMap() {
    currentTripID = window.location.hash.substring(1);
    db.collection("trips").doc(currentTripID).get()
        .then(function(doc) {
            currentTripInfo = doc.data();
            searchCrawlLocations();
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
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

    // Initialize directionsService, a DirectionsService object
    directionsService = new google.maps.DirectionsService;
    directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        map: map
    });

    infowindow = new google.maps.InfoWindow();
}

function callback(results, status) {
    directionsRenderer.setMap(null);
    numberOfLocations = parseInt(currentTripInfo.number);
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        results = randomize(results);

        var savedPlaces = [];
        var waypoints = [];
        for (var i = 0; i < numberOfLocations; i++) {
            savedPlaces.push({
                location: results[i].formatted_address,
                name: results[i].name
            });
            console.log(savedPlaces);
            createMarker(results[i]);
            waypoints.push({
                location: results[i].formatted_address,
                stopover: true
            });
        }
    }
    // Append/update existing key with origin, way points, and destination place information
    currentTripInfo.saveplaced = savedPlaces;
    db.collection("trips").doc(currentTripID).set(currentTripInfo)
    directionsService.route({
        origin: results[0].formatted_address,
        destination: results[numberOfLocations - 1].formatted_address,
        optimizeWaypoints: true,
        waypoints: waypoints,
        travelMode: 'WALKING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
            directionsRenderer.setMap(map);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    markersArray.push(marker);

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

function searchCrawlLocations() {
    for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
    }
    markersArray = [];
    var searchType = currentTripInfo.type;
    var searchLocation = currentTripInfo.main_location;
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({
        'address': searchLocation
    }, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();

            var locationSearch = {
                location: {
                    lat: latitude,
                    lng: longitude
                },
                rankby: "distance",
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

function randomize(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}