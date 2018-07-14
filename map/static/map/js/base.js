/* all related to map */

$(document).ready(function () {
    let map = L.map('map').setView([14.657855, 121.013732], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    $('.marquee').marquee({
        duration: 10000,
        gap: 50,
        delayBeforeStart: 0.005,
        direction: 'left',
        duplicated: true
    });

    createStationMarker();
    createVolumeCircle();
    createTrainIcon();

    setInterval(function () {
        // reset map
        map.eachLayer(function (layer) {
            map.removeLayer(layer);
        });

        // re-add layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        createStationMarker();
        createVolumeCircle();
        createTrainIcon();
    }, 5000);

    function createStationMarker() {

        var StationIcon = L.icon({
            iconUrl: 'https://image.ibb.co/mpWAro/location.png'
        })

        one = L.marker([14.6575085, 121.0211068]).addTo(map).bindPopup("Roosevelt Station");
        two = L.marker([14.6573742, 121.0038417]).addTo(map).bindPopup("Balintawak Station");
        three = L.marker([14.6541636, 120.9838426]).addTo(map).bindPopup("Monumento Station");
        four = L.marker([14.6442761, 120.9835126]).addTo(map).bindPopup("5th Avenue Station");
        five = L.marker([14.6360459, 120.9823606]).addTo(map).bindPopup("R. Papa Station");
        six = L.marker([14.6306506, 120.9813576]).addTo(map).bindPopup("Abad Santos Station");
        seven = L.marker([14.6227638, 120.9827973]).addTo(map).bindPopup("Blumentritt Station");
        eight = L.marker([14.6166733, 120.9828535]).addTo(map).bindPopup("Tayuman Station");
        nine = L.marker([14.6111077, 120.9823650]).addTo(map).bindPopup("Bambang Station");
        ten = L.marker([14.6054128, 120.9819391]).addTo(map).bindPopup("Doroteo Jose Station");
        eleven = L.marker([14.5989282, 120.9812791]).addTo(map).bindPopup("Carriedo Station");
        twelve = L.marker([14.5928463, 120.9816209]).addTo(map).bindPopup("Central Terminal Station");
        thirteen = L.marker([14.5827373, 120.9845427]).addTo(map).bindPopup("United Nations Station");
        fourteen = L.marker([14.5765406, 120.9881085]).addTo(map).bindPopup("Pedro Gil Station");
        fifteen = L.marker([14.5702436, 120.9916194]).addTo(map).bindPopup("Quirino Station");
        sixteen = L.marker([14.5635410, 120.9947090]).addTo(map).bindPopup("Vito Cruz Station");
        seventeen = L.marker([14.5541106, 120.9971305]).addTo(map).bindPopup("Gil Puyat Station");
        eighteen = L.marker([14.5476644, 120.9986100]).addTo(map).bindPopup("Libertad Station");
        nineteen = L.marker([14.5389780, 121.0005946]).addTo(map).bindPopup("EDSA Station");
        twenty = L.marker([14.5342782, 120.9984029]).addTo(map).bindPopup("Baclaran Station");
    }

    function createVolumeCircle() {
        $.ajax({
            url: "http://178.128.16.137:3000/api/org.nexus.basic.Platform",
            data: {},
            type: "GET",
            dataType: "json",
            success: function (json) {
                /* test console logs here */
                console.log(json);

                for (var pl in json) {
                    console.log(json[pl].volume);

                    if (json[pl].volume <= 10) {
                        var circle = L.circle([json[pl].lat, json[pl].lng], {
                            color: 'green',
                            fillColor: 'green',
                            fillOpacity: 0.5,
                            radius: 600
                        }).addTo(map);
                    } else if (json[pl].volume <= 20) {
                        var circle = L.circle([json[pl].lat, json[pl].lng], {
                            color: 'orange',
                            fillColor: 'orange',
                            fillOpacity: 0.5,
                            radius: 600
                        }).addTo(map);
                    } else {
                        var circle = L.circle([json[pl].lat, json[pl].lng], {
                            color: 'red',
                            fillColor: 'red',
                            fillOpacity: 0.5,
                            radius: 600
                        }).addTo(map);
                    }
                }
            }
        });
    }

    function createTrainIcon() {
        $.ajax({
            url: " http://178.128.16.137:3000/api/queries/selectFirstTrains?order=1",
            data: {},
            type: "GET",
            dataType: "json",
            success: function (json) {
                /* test console logs here */
                console.log(json);

                for (var pl in json) {
                    console.log(json[pl].locationLat, json[pl].locationLon);

                    var TrainIcon = L.icon({
                        iconUrl: 'https://image.ibb.co/fASGWo/train.png',
                        iconSize: [60, 70], // size of the icon
                        iconAnchor: [20, 51], // point of the icon which will correspond to marker's location
                        popupAnchor: [0, -51]
                    });

                    if (json[pl].volume <= 10) {
                        volumex = "Light volume";
                    } else if (json[pl].volume <= 20) {
                        volumex = "Moderate volume";
                    } else {
                        volumex = "Heavy volume";
                    }

                    htmlx = "<b> Volume: </b>" + volumex + "<br/>" + "<b>Speed:</b>" + json[pl].speed +
                        "km/hr<br/>" + "<b>Temperature: </b>" + json[pl].temperature + " degrees celsius";
                    L.marker([json[pl].locationLat, json[pl].locationLon], {icon: TrainIcon}).addTo(map).bindPopup(htmlx, {autoClose: false}).openPopup();
                }
            }
        });
    }
});


/* time */

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    if (h >= 12) {
        s = s + ' PM'
    }
    ;
    if (h < 12 || h == 0) {
        s = s + ' AM'
    }
    ;
    if (h > 12) {
        h = h - 12
    }
    ;
    if (h == 0) {
        h = h + 12
    }
    ;
    document.getElementById('time').innerHTML =
        h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }
    ;  // add zero in front of numbers < 10

    return i;
}