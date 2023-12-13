const token = "839ab0d3-070b-4298-8e8e-62bed11c7adb";
const chiave = "progetto-poi";
const urlSet = "https://ws.progettimolinari.it/cache/set";
const urlGet = "https://ws.progettimolinari.it/cache/get";

const addImage = document.getElementById("add-image");
const divInput = document.getElementById("input-images-box");

const inputTemplate = `
<input type="text" class="form-control imageInput hidden" id="name-input%n" aria-describedby="emailHelp" placeholder="Enter image url">`


const clearValues = () =>{
  document.getElementById("name-input").value="";
  document.getElementById("description-input").value="";
  document.getElementById("lon-input").value="";
  document.getElementById("lat-input").value="";
}

const addPoiButton = document.getElementById("add-poi");

addPoiButton.onclick = () =>{
  clearValues()
  let html = ""
  for (let i=0; i<10; i++) {
    html += inputTemplate.replace("%n", String(i+1));
  }
  divInput.innerHTML = html;
  document.querySelector("#name-input1").classList.remove("hidden");
}


//max 10 images
let imagesAdded = 1;
addImage.onclick = () => {
  if(imagesAdded<10){
    document.querySelector("#name-input"+String(imagesAdded+1)).classList.remove("hidden");
    imagesAdded+=1;
  }
}



const save = (array) =>{
  fetch(urlSet, {
    headers: {
      "Content-Type": "application/json",
      key: token
    },
    method: "POST",
    body: JSON.stringify({
      key: chiave,
      value: array
    })
  })
    .then((r) => r.json())
    .then((r) => {
      console.log("Risposta: " + r.result);
      renderTable(array);
    })
    .catch((r) => {
      console.log("Risposta: " + r.result);
    });
};


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
      clickSave(r.result);
      renderTable(r.result);
    })
}

const saveButton = document.getElementById("save-button");
const clickSave = (array) => {
  saveButton.onclick = () => {
    const nameInput = document.getElementById("name-input");
    const descrInput = document.getElementById("description-input");
    const imagesInputs = [].slice.apply(document.querySelectorAll(".imageInput"));
    const lonInput = document.getElementById("lon-input");
    const latInput = document.getElementById("lat-input");

    const nameValue = nameInput.value;
    const descrValue = descrInput.value;
    const imagesUrl = imagesInputs.map(input => input.value);
    const lonValue = lonInput.value;
    const latValue = latInput.value;

    const id = Date.now();
    console.log(id)

    const poi = {
      id: id,
      nome: nameValue,
      descrizione: descrValue,
      immagine: imagesUrl,
      coordinate:{
        longitudine: lonValue,
        latitudine: latValue
      },
    };
    array.push(poi);
    save(array);
  }
}


get();






//vista

const divContentPoi = document.getElementById("poi-content");

const divPoiTemplate = `
<div class="poi" id="%id">
      <div class="nome">%nome</div>
      <div class="buttons-poi">
        <button class="delete-button btn" id="button%id">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
          </svg>
        </button>
      </div>
    </div>`;
  

const renderTable = (array) => {
  //render tabelle e tutto
  divContentPoi.innerHTML = "";
  console.log(array);
  array.forEach((poi) => {
    divContentPoi.innerHTML += divPoiTemplate.replace("%nome",poi.nome).replaceAll("%id",poi.id);
  })
  //delete buttons
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.onclick = () => {
      const buttonId = button.id.replace("button","");
      array.forEach((poi)=>{
        if(poi.id==buttonId){
          array.splice(array.indexOf(poi),1);
          console.log(array);
          save(array);
        };
      });
    };
  });

  //open detail
  const poiDiv = document.querySelectorAll(".poi");
  poiDiv.forEach((div) => {
    div.onclick = () => {
      const id = div.id;
      console.log(id);
    }
  })
  
}