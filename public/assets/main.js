// Here is the key for the Zomato API = cd1577ead710b996f1a2d0ecae1431dd
var map;
var infowindow;
var markersArray = [];
var numberOfLocations;
var results;


// $(window).load(function() {

// var autocomplete = new google.maps.places.Autocomplete(document.getElementById("search-location"), { types: ['(cities)'] });


$("#the_submit_button").on("click", function (event) {
    event.preventDefault();
    console.log("Fired at on click")
    save_this_shit(function () {
        window.location = window.origin + "/build-page3.html";
    });
});



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

    infowindow = new google.maps.InfoWindow();

}

function callback(results, status) {
    numberOfLocations = parseInt($("#num_ques").val());
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        results = randomize(results);
        for (var i = 0; i < numberOfLocations; i++) {
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
    console.log("CLICKED");
    for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
    }
    markersArray = [];
    var searchType = $("#search-type").val();
    var searchLocation = $("#search-location").val();
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
// });