import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
  let res= await fetch(config.backendEndpoint+'/cities');
  let data=await res.json();
  return data;
  }catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let data=document.getElementById('data');
  let ele=document.createElement('div');
  // ele.setAttribute('id','london')
  ele.innerHTML=`
    <a href='pages/adventures/?city='london' id ='london'>
    <div class="tile">
    <img src='https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format'/>
    <div class="tile-text text-center">
      <h5>London</h5>
      <p>London is the capital of UK</p>
    </div>
  </div>
    </a>
  `
  // data.appendChild(ele);
  let cities=document.createElement('div');
   cities.setAttribute('class','col-12 col-sm-6 col-lg-3 mb-4');
  cities.innerHTML=`
  <a href="pages/adventures/?city=${id}" id=${id}>
  <div class="tile">
    <img src=${image} />
    <div class="tile-text text-center">
      <h5>${city}</h5>
      <p>${description}</p>
    </div>
  </div>
</a>
  `
  data.appendChild(cities);

}

export { init, fetchCities, addCityToDOM };
