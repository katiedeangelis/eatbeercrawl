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

    // Array of markers 
    var markerArray = [{
            coords: {
                lat: 43.075705,
                lng: -70.760580
            },
            iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            content: '<h6>Jumpin Jays Fish Cafe</h6>'
        },
        {
            coords: {
                lat: 43.077258,
                lng: -70.754034
            },
            content: '<h6>The Rosa Restaurant</h6>'
        },
        {
            coords: {
                lat: 43.079041,
                lng: -70.759485
            },
            content: '<h6>Earth Eagle Brewings</h6>'
        }
    ];

    // Loop through marker array

    for (var i = 0; i < markerArray.length; i++) {
        addMarker(markerArray[i]);
    }

    // Add marker function
    function addMarker(props) {
        // Add marker
        var marker = new google.maps.Marker({
            position: props.coords,
            map: map,
        });

        // Check for custom icon 
        if (props.iconImage) {
            // Set icon image
            marker.setIcon(props.iconImage);
        }

        // Check for content
        if (props.content) {
            // Set content
            var infowindow = new google.maps.InfoWindow({
                content: props.content
            });
            // Add even listener for marker click
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
        }
    }
}