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




function displayRoute(origen,destination, service, display) {

            service.route({
                origin: origen,
                destination:
                destination,
                waypoints: [
                    {
                        location: { lat: 37.980589, lng: -0.684743 }, //lat: 37.975110, lng: -0.678840
                        stopover: false
                    }, {
                        location: { lat: 37.979849, lng: -0.684429 }, //lat: 37.975110, lng: -0.678840
                        stopover: false
                    }, {
                        location: { lat: 37.977535, lng: -0.675144 }, // lat: 37.976475, lng: -0.680134 AQUI
                        stopover: false
                    }, {
                        location: { lat: 37.978101, lng: -0.684616 }, // lat: 37.976475, lng: -0.680134
                        stopover: false
                    },{
                        location: { lat: 37.976812, lng: -0.684339 }, // lat: 37.976475, lng: -0.680134
                        stopover: false
                    }, {
                        location: { lat: 37.976231, lng: -0.683207 },
                        stopover: false
                    }/*, {
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
                    }*/



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

var lat = [
    [37.980589, -0.684743, "images/gastronomia1.png","Bar las gaviotas"], // jardin de las naciones
    [37.979849, -0.684429, "images/patrimonio1.png", "Plaza de las mazas"],
    [37.977535, -0.675144, "images/cultura1.png", "Desfile de disfraces"],
    [37.978101, -0.684616, "images/gastronomia1.png", "Restaurante mesón la huertica"],
    [37.976812, -0.684339, "images/cultura1.png", "Museo del Mar y la sal"],//MUSEO DEL MAR Y DE LA SAL
    [37.976231, -0.683207, "images/gastronomia1.png", "Restaurante Love chocolate"]/*,
    [37.976261, -0.681233, "images/gastronomia1.png", "Bar las gaviotas"],
    [37.976475, -0.680134, "images/gastronomia1.png", "Bar las gaviotas"],
    [37.975793, -0.678776, "images/gastronomia1.png", "Bar las gaviotas"],
    [37.975110, -0.678840, "images/gastronomia1.png", "Bar las gaviotas"],
    [37.974582, -0.678150, "images/gastronomia1.png", "Bar las gaviotas"],
    [37.976532, -0.677199, "images/gastronomia1.png", "Bar las gaviotas"],
    [37.976857, -0.676264, "images/gastronomia1.png", "Bar las gaviotas"]*//*,,
    	[37.976688, -0.676087]*/
    /*[37.995779, -0.679372, "images/gastronomia1.png"], //PARQUE ANTONIO SORIA   
   
    [38.014379, -0.655391, "images/gastronomia1.png"], //PARQUE DEL MOLINO DEL AGUA
    [37.972479, -0.681198, "images/cultura1.png"],  //MUSEO FLOTANTE SUBMARINO S-61 Delfín
    [38.001074, -0.651423, "images/gastronomia1.png"], //MIRADOR TURÍSTICO DE LA TORRE DEL MORO
   
    [37.990058, -0.686901, "images/compras1.png"] //CENTRO COMERCIAL HABANERAS*/


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
        zoom: 18,
        center: { lat: 37.981147, lng: -0.685000 }
    });

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: false,
        map: map,
        //panel: document.getElementById('datos')
    });

    var nombre_marker;
    for (var i = 0; i < lat.length; i++) {


        nombre_marker = new google.maps.Marker({
            position: { lat: lat[i][0], lng: lat[i][1] },
            icon: lat[i][2],
            map: map
        });

        //   var nombre= lat[i][3];
    
    var infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(nombre_marker, 'click', (function (nombre_marker, i) {
        return function () {
            infowindow.setContent(lat[i][3]),
            infowindow.open(map, this);
        }
    })(nombre_marker, i));


    }

    if (navigator.geolocation) {

        navigator.geolocation.watchPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude   
            };
        
            displayRoute(new google.maps.LatLng(37.980872, -0.685013), new google.maps.LatLng(37.976275, -0.6820651), directionsService, directionsDisplay); //37.976688, -0.676087
        }, function (objPositionError) {
            // Procesar errores
        }, {
                maximumAge: 75000,
                timeout: 15000
        });
         
    }

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
                [37.977535, -0.675144],
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


//meteorología
function prediccion() {
 

    $.ajax({
        url: 'https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/03133?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGJlcnRvLmJlcmVuZ3Vlci45N0BnbWFpbC5jb20iLCJqdGkiOiI3OWIxMDgyYi0wZjQ3LTRiMDktYTI5Yy01OWEzMzQ3YzAyOWIiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTUxMTAyMzU4OCwidXNlcklkIjoiNzliMTA4MmItMGY0Ny00YjA5LWEyOWMtNTlhMzM0N2MwMjliIiwicm9sZSI6IiJ9.t3swEL4rqvJ7oCyUq3LZuxIcOf-f1JN2qPe9C0awIWU',
        type: 'GET',
        dataType: "jsonp",
        success: function (data) {
            var ide = 0;
            $.each(data, function (key, item) {
               alert(item['datos']);

            });
        }

    });

    $.ajax(settings).done(function (response) {
        console.log(response);
    });

}