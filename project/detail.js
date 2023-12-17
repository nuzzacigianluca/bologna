const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const poi = urlParams.get('poi')


const token = "839ab0d3-070b-4298-8e8e-62bed11c7adb";
const chiave = "progetto-poi";
const urlSet = "https://ws.progettimolinari.it/cache/set";
const urlGet = "https://ws.progettimolinari.it/cache/get";
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
        console.log(array)
        findPoi()
      })
  };

const findPoi=()=>{
    array.forEach((element)=>{
        if(element.id==poi){
            renderAll(element)
            renderPhotos(element)
        }
    })
}
const photoTemplate=`<div class="carousel-item">
<img class="d-block w-100" title="source: imgur.com" src="%imagesrc" alt="%imagesrc">
</div>`

const firstPhoto =`<div class="carousel-item active">
<img class="d-block w-100" title="source: imgur.com" src="%firstimg" alt="%firstimg">
</div>`

const templateNew = `<div class="container">
<div class="row">
  <div class="col"><p class="font-weight-bold">Nome</p></div>
  <div class="col"><h4>%nomepoi</h4></div>
  <div class="w-100"></div>
  <div class="col"><p class="font-weight-bold">Foto</p></div>
  <div class="col">
  <div id="carouselExampleControls1" class="carousel slide" data-ride="carousel">
  <div id="photos" class="carousel-inner">
    
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls1" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls1" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
  </div>
  <div class="w-100"></div>
  <div class="col"><p class="font-weight-bold">Descrizione</p></div>
  <div class="col"> <p> 
      %descrizione</p></div>
  <div class="w-100"></div>
  <div class="col"><p class="font-weight-bold">Coordinate</p></div>
  <div class="col">%coord</div>
</div>
</div>`


const template = `<div class="container">
<div class="row">
  <div class="col"><p class="font-weight-bold">Nome</p></div>
  <div class="col"><h4>%nomepoi</h4></div>
  <div class="w-100"></div>
  <div class="col"><p class="font-weight-bold">Foto</p></div>
  <div class="col">
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div id="photos" class="carousel-inner">
      </div>
      <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
  <div class="w-100"></div>
  <div class="col"><p class="font-weight-bold">Descrizione</p></div>
  <div class="col"> <p> 
      %descrizione</p></div>
  <div class="w-100"></div>
  <div class="col"><p class="font-weight-bold">Coordinate</p></div>
  <div class="col">%coord</div>
</div>
</div>`



const renderAll = (element) =>{
    console.log(element.immagine)
    let html ="";
    let row="";
    const coord = element.coordinate.latitudine + ", "+ element.coordinate.longitudine;
    row=templateNew.replace("%nomepoi", element.nome).replace("%descrizione", element.descrizione).replace("%coord", coord);
    html=row;
    document.getElementById("detail").innerHTML=html;
    
}   
get()

const renderPhotos = (element) =>{
  let html ="";
  //let row="";
  row=firstPhoto.replaceAll("%firstimg", element.immagine[0]);
  html+=row;
  console.log(html);
  console.log(element);
  for (let i = 1; i <= element.immagine.length; i++) {
      row=photoTemplate.replaceAll("%imagesrc", element.immagine[i]);
      html+=row;
      console.log(html);
  }
  document.getElementById("photos").innerHTML=html;
}
