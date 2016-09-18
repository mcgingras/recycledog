//Find coordinates of zip code from json 
var geocoder;
var coord;

function initialize() {
    geocoder = new google.maps.Geocoder();
}

function codeAddress() {
    var address = '14850' /*items[i].postalCode*/
    geocoder.geocode({
        'address': address
    	}, 
      function(results, status) {
            coord = results[0].geometry.location;
            alert(coord);
    });
}

// html
// <script type="text/javascript" src="//maps.googleapis.com/maps/api/js?sensor=false"></script>
// <body onload="initialize()">
//     <input type="button" value="Geocode" onclick = "codeAddress()">
// </body>

//Calculate distance between two points
function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                var latLngB = new google.maps.LatLng(40.778721618334295, -73.96648406982422);
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
                alert(distance);//In metres
            },
            function() {
                alert("geolocation not supported!!");
            }
    );
}