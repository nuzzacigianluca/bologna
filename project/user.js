const token = "839ab0d3-070b-4298-8e8e-62bed11c7adb";
const chiave = "progetto-poi";
const urlSet = "https://ws.progettimolinari.it/cache/set";
const urlGet = "https://ws.progettimolinari.it/cache/get";

let array = [];


//vista lista
const divPoiTemplate = `
<div class="poi" id="%id">
  <div class="image-poi">
    <img src="%linkimage">
  </div>
  <div class="bottom-poi">
    <div class="nome">%nome</div>
    <div class="buttons-poi">
      <button type="button" class="btn edit-button" id="edit%id" data-toggle="modal" data-target="#modalEdit%id">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
        </svg>
      </button>
      <!-- Modal -->
  <div class="modal fade" id="modalEdit%id" tabindex="-1" role="dialog"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit Point of Interest</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="name-input%id">Name</label>
              <input type="text" class="form-control" id="name-input%id" placeholder="Enter name">
            </div>
            <div class="form-group">
              <label for="description-input%id">Description</label>
              <textarea type="text" class="form-control" id="description-input%id"
                placeholder="Add description"></textarea>
            </div>
            <div class="form-group">
              <label for="image-input%id">Images</label>
              <div id="input-images-box%id">

              </div>
              <button id="add-image%id" class="btn btn-light" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg"
                  viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                </svg>
              </button>
              <small id="" class="form-text text-muted">Max 10 images</small>
            </div>
            <div class="row">
              <label for="coord-box%id">Coordinates</label>
              <div class="col" id="coord-box%id">
                <label for="lon-input%id">Longitude</label>
                <input type="text" class="form-control" id="lon-input%id" placeholder="Add longitude">
              </div>
              <div class="col">
                <label for="lat-input%id">Latitude</label>
                <input type="text" class="form-control" id="lat-input%id" placeholder="Add latitude">
              </div>
            </div>

          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" id="save-button%id">Edit</button>
        </div>
      </div>
    </div>
  </div>
      <button type="button" class="btn" id="trash%id" data-toggle="modal" data-target="#modalDelete%id">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash"
          viewBox="0 0 16 16">
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
          <path
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg>

        
      </button>
      <!-- Modal -->
        <div class="modal fade" id="modalDelete%id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Elimina POI</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Sei sicuro di voler eliminare il Point Of Interest?
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Annulla</button>
                <button type="button" class="btn btn-danger delete-button" id="button%id" data-dismiss="modal">Elimina POI</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>

</div>`;



//coordinate bologna
const lat_b= 44.494887
const long_b=11.3426163

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



const mapFunction = () => {
  console.log(array)
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
  setCenter(map, [long_b, lat_b]);
  setZoom(map, 15.5);
  array.forEach((element)=>{
    let coordi = { lonlat: [element.coordinate.latitudine, element.coordinate.longitudine], name: element.nome }
    addMarker(map, coordi);
    //addMarker(map, { lonlat: [element.coordinate.latitudine, element.coordinate.longitudine], name: element.nome });
  })
  /*
  const trova = document.getElementById("trova")
  trova.onclick = () => {s
    const lat1 = document.getElementById("lat1")
    const long1 = document.getElementById("long1")
    const lat2 = document.getElementById("lat2")
    const long2 = document.getElementById("long2")
    let coordi = { lonlat: [lat1.value, long1.value], name: "mark1" }
    addMarker(map, coordi);
    addMarker(map, { lonlat: [lat2.value, long2.value], name: "mark2" });
    const max_x = Math.max(12.492, coordi.lonlat[0])
    const max_y = Math.max(41.890, coordi.lonlat[1])

  }*/

  initOverlay(map);

}



const listTemplate = `
<div id="divListView" class="poi-content">
  lista
</div>`;

const mapTemplate = `
<div class="map" id="divMapView">
  <div id="popup" class="ol-popup">
    <a href="#" id="popup-closer" class="ol-popup-closer"></a>
    <div id="popup-content">
      mappa
    </div>
  </div>
</div>
`
const contentView = document.getElementById("content-view");

const buttonListView = document.getElementById("buttonListView");
const buttonMapView = document.getElementById("buttonMapView");

contentView.innerHTML = listTemplate;

buttonListView.onclick = () => {
  contentView.innerHTML = listTemplate;
}

buttonMapView.onclick = () => {
  contentView.innerHTML = mapTemplate;
  mapFunction();
}



get();


//logout
const logoutButton = document.getElementById("log-out");
logoutButton.onclick = () => {
  window.location.href = "login.html";
}