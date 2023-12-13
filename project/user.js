const token = "839ab0d3-070b-4298-8e8e-62bed11c7adb";
const chiave = "progetto-poi";
const urlSet = "https://ws.progettimolinari.it/cache/set";
const urlGet = "https://ws.progettimolinari.it/cache/get";

let array = [];

const get = () => {
  fetch(urlGet, {
    headers: {
      "Content-Type": "application/json",
      key: token
    },
    method: "POST",
    body: JSON.stringify({
      key: chiave
    })
  })
    .then((r) => r.json())
    .then((r) => {
      array = r.result;
      console.log(array);
      //render(array);
    })
};



const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');
let overlay;

function setLayers(map) {
  const layers = [new ol.layer.Tile({ source: new ol.source.OSM() })]; // crea un layer da Open Street Maps
  map.addLayer(new window.ol.layer.Group({ layers })); // lo aggiunge alla mappa
}
function setCenter(map, lonlat) {
  const center = window.ol.proj.fromLonLat(lonlat);
  map.getView().setCenter(center); //fissa il centro della mappa su una certa coppia di coordinate
}
function setZoom(map, zoom) {
  map.getView().setZoom(zoom); // fissa il livello di zoom
}
function addMarker(map, point) {
  const feature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat(point.lonlat))
  });
  feature.name = point.name;
  const layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [feature]
    }),
    style: new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 1],
        crossOrigin: 'anonymous',
        src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png',
      })
    })
  });
  map.addLayer(layer);
}

// crea un popup e gestisce l'apertura dell'overlay
function initOverlay(map, points) {
  overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250
    }
  });
  map.addOverlay(overlay);
  closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
  };

  map.on('singleclick', function(event) {
    if (map.hasFeatureAtPixel(event.pixel) === true) { // se esiste un marker
      map.forEachFeatureAtPixel(event.pixel, (feature, layer) => { // lo recupera
        const coordinate = event.coordinate; // ne prende le coordinate
        content.innerHTML = feature.name; // cambia il testo del popup
        overlay.setPosition(coordinate); // e lo sposta sopra il marker
      })
    } else {
      overlay.setPosition(undefined); // altrimenti lo nasconde
      closer.blur();
    }
  });

}

// create map
const map = new ol.Map({ target: document.querySelector('.map') });
setLayers(map);
setCenter(map, [12.492, 41.890]);
setZoom(map, 10);
const trova = document.getElementById("trova")
trova.onclick = () => {
  const lat1 = document.getElementById("lat1")
  const long1 = document.getElementById("long1")
  const lat2 = document.getElementById("lat2")
  const long2 = document.getElementById("long2")
  let coordi = { lonlat: [lat1.value, long1.value], name: "mark1" }
  addMarker(map, coordi);
  addMarker(map, { lonlat: [lat2.value, long2.value], name: "mark2" });
  const max_x = Math.max(12.492, coordi.lonlat[0])
  const max_y = Math.max(41.890, coordi.lonlat[1])

}

initOverlay(map);
get();