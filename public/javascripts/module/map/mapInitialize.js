/**
 * Created by Edward on 4/1/2015.
 */
function mapInitialize() {

    var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(49.246292, -123.116226)
    };

    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
}

google.maps.event.addDomListener(window, 'load', mapInitialize);