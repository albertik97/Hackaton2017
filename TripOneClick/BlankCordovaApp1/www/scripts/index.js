// Si quiere una introducción sobre la plantilla En blanco, vea la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Para depurar código al cargar la página en cordova-simulate o en dispositivos o emuladores Android: inicie la aplicación, establezca puntos de interrupción 
// y ejecute "window.location.reload()" en la Consola de JavaScript.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Controlar la pausa de Cordova y reanudar eventos
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova se ha cargado. Haga aquí las inicializaciones que necesiten Cordova.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    };

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };
})();


function displayRoute(origen, destination, service, display) {
    console.log(origen.lat());
    console.log(origen.lng());
            service.route({
                origin: origen,
                destination: destination,
                waypoints: [
                    {
                        location: { lat: 37.980001, lng: -0.684123 }, //lat: 37.975110, lng: -0.678840
                        stopover: false
                    }, {
                        location: { lat: 37.978101, lng: -0.684616 }, // lat: 37.976475, lng: -0.680134
                        stopover: false
                    }, {
                        location: { lat: 37.976231, lng: -0.683207 },
                        stopover: false
                    }, {
                        location: { lat: 37.976261, lng: -0.681233 }, // lat: 37.974582, lng: -0.678150 
                        stopover: false
                    }, {
                        location: { lat: 37.976475, lng: -0.680134 }, //lat: 37.980589, lng: -0.684743
                        stopover: false
                    }, {
                        location: { lat: 37.975793, lng: -0.678776 }, // lat: 37.976688, lng: -0.676087
                        stopover: false
                    }, {
                        location: { lat: 37.975110, lng: -0.678840 }, //lat: 37.976532, lng: -0.677199
                        stopover: false
                    }, {
                        location: { lat: 37.974582, lng: -0.678150 }, // lat: 37.976857, lng: -0.676264 dddd
                        stopover: false
                    }, {
                        location: { lat: 37.976532, lng: -0.677199 }, //lat: 37.976857, lng: -0.676264
                        stopover: false
                    }, {
                        location: { lat: 37.976857, lng: -0.676264 },
                        stopover: false
                    }

                ],
                travelMode: 'WALKING',
                avoidTolls: true
            }, function (response, status) {
                if (status === 'OK') {
                    display.setDirections(response);
                } else {
                    alert('Could not display directions due to: ' + status);
                }
            });

}


var map;
var marker;
var i;
var infowindow;

var lat = [
    /*[37.980589, -0.684743],*/
    [37.980001, -0.684123],
    [37.978101, -0.684616],
    [37.976231, -0.683207],
    [37.976261, -0.681233],
    [37.976475, -0.680134],
    [37.975793, -0.678776],
    [37.975110, -0.678840],
    [37.974582, -0.678150],
    [37.976532, -0.677199],
    [37.976857, -0.676264],/*,
    	[37.976688, -0.676087]*/
    [37.995779, -0.679372], //PARQUE ANTONIO SORIA   
    [37.983343, -0.686869], //JARDÍN DE LAS NACIONES 
    [38.014379, -0.655391], //PARQUE DEL MOLINO DEL AGUA
    [37.972479, -0.681198],  //MUSEO FLOTANTE SUBMARINO S-61 Delfín
    [38.001074, -0.651423], //MIRADOR TURÍSTICO DE LA TORRE DEL MORO
    [37.976812, -0.684339],//MUSEO DEL MAR Y DE LA SAL
    [37.990058, -0.686901] //CENTRO COMERCIAL HABANERAS


];



function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById('total').innerHTML = total + ' km';
}

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: { lat: 37.980589, lng: -0.684743 }
    });

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: false,
        map: map,
        panel: document.getElementById('datos')
    });


    for (i = 0; i < lat.length; i++) {
         marker = new google.maps.Marker({
            position: { lat: lat[i][0], lng: lat[i][1] },
            /* map: map,*/

        });
       
        marker.setMap(map);
        
        var infowindow = new google.maps.InfoWindow();

        google.maps.event.addListener(marker,'click', function () {
            infowindow.setContent('<p>'+'Love Chocolate'+'</p>');
            infowindow.open(map, this);
       });
    }

    var beachMarker;
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
            var pos_loc = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var imagen = 'images/posicion.png';
            if (beachMarker) {
                beachMarker.setPosition(pos_loc);
            } else {

                beachMarker = new google.maps.Marker({
                    position: pos_loc,
                    map: map,
                    icon:imagen,
                    title: 'Tú posicion'
                });
            }
           
        }, function (objPositionError) {
            // Procesar errores
        }, {
                maximumAge: 75000,
                timeout: 15000
        });
    }
    displayRoute(new google.maps.LatLng(37.976688, -0.676087), new google.maps.LatLng(37.976688, -0.676087), directionsService, directionsDisplay);
}


$.ajax({
    url: 'https://dev.datos.ua.es/uapi/e4SpYzPgQtGZeMtH5eR5/datasets/39/data',
    type: "get",
    dataType: "jsonp",
    success: function (datos_maquinas, textStatus, jqXHR) {

        var infoRuta =
            [
                [37.979324, -0.683852],
                [37.975110, -0.678840],
                [37.976475, -0.680134],
                [37.976231, -0.683207],
                [37.974582, -0.678150],
                [37.980589, -0.684743]
            ]


        


        /* var posicion = { lat: 37.9895551, lng: -0.6749088 };
                 var map = new google.maps.Map(document.getElementById('map'), {
                     zoom: 16,
                     center: posicion
         });
         var marker = new google.maps.Marker({
              position: posicion,
              map: map
                 });
 
         var marker2 = new google.maps.Marker({
             position: { lat: 37.9895551, lng: -0.67 },
             map: map
         });
         var contentString = '<div id="content" style="color: black;">' +
             '<div id="siteNotice">' +
             '</div>' +
             '<div id="bodyContent">' +
             '<p><b>Nombre del lugar</b></p>' +
             '</div>' +
             '</div>';
 
         var infowindow = new google.maps.InfoWindow({
             content: contentString
         });
 
         marker.addListener('click', function () {
             infowindow.open(map, marker);
         });
 
         marker2.addListener('click', function () {
             infowindow.open(map, marker);
         });
 
         var directionsService = new google.maps.DirectionsService;
 
         directionsService.route({
             origin: Position,
             destination: { lat: 37.9895551, lng: -0.67 }
         });*/


    }
});
