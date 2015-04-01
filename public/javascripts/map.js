/**
 * Created by Edward on 3/19/2015.
 */
var map;
function mapInitialize() {
    var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(49.246292, -123.116226)
    };



    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    return map;
}

google.maps.event.addDomListener(window, 'load', initialize);