/**
 * Created by Edward on 3/19/2015.
 */
var map;
function initialize() {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(-34.397, 150.644)
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
}

//initialize();
console.log("in map.js");
google.maps.event.addDomListener(window, 'load', initialize);