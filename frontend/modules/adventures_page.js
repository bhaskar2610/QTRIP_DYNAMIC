import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  try {
    const urlParams = new URLSearchParams(search);
    let city = urlParams.get("city");
    return city;
  } catch (err) {
    return null;
  }
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let res = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    let data = await res.json();
    return data;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let data = document.getElementById("data");
  console.log(adventures);
  adventures.forEach(key=>{
  let newCity=document.createElement('div');
  newCity.setAttribute('id','park');
  newCity.innerHTML=`
  <a href="detail/?adventure=123456" id="123456">
 
</a>
  `
  data.appendChild(newCity);
});
  



  adventures.forEach((key) => {
    let ele = document.createElement("div");
    ele.setAttribute('class','col-6 col-lg-3 mb-3');
    ele.innerHTML = `
    <a href="detail/?adventure=${key.id}">
      <div class="card activity-card">
        <div class="category-banner">${key.category}</div>
        <img src=${key.image}  alt="..." />
        <div class="card-body " style="width:100%">
        <div class="d-md-flex justify-content-between " style="width:100%">
          <h5 class="card-title">${key.name}</h5>
          <p class="card-text">₹${key.costPerHead}</p>
          </div>
           <div class="d-md-flex justify-content-between" style="width:100%">
          <h5 class="card-title">Duration</h5>
          <p class="card-text">${key.duration}hours</p>
          </div>
          </div>
      </div>
    </a>
    `;
    data.appendChild(ele);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let fList=[];
  list.forEach(element=>{
     if(element.duration>=low&&element.duration<=high)
      fList.push(element);
  });
  if(fList.length==0)
    return list;
  return fList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let fList=[];
  for(let j=0;j<categoryList.length;j++){
    for (let i = 0; i < list.length; i++) {
      if (list[i].category==categoryList[j]) {
          fList.push(list[i]);
      } 
    }
  }
  if(fList.length===0){
    return list;
  }
  return fList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
let filteredList=[];
if (filters["duration"].length > 0 && filters["category"].length > 0) {
  let choice = filters["duration"].split("-");
  filteredList = filterByDuration(
    list,
    parseInt(choice[0]),
    parseInt(choice[1])
  );
  filteredList = filterByCategory(filteredList, filters["category"]);
}else if(filters["duration"].length > 0){
  let choice = filters["duration"].split("-");
  filteredList = filterByDuration(
    list,
    parseInt(choice[0]),
    parseInt(choice[1])
  );
}else if(filters["category"].length > 0){
  filteredList = filterByCategory(list, filters["category"]);
}

 if(filteredList.length==0)
  return list;
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
  window.localStorage.setItem('filters',JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format
  return JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
   return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
  if(filters["category"].length>0){
   let categoryList = document.getElementById("category-list");
   
   filters["category"].forEach((element)=>{
    let tags=document.createElement('p');
     tags.setAttribute('class',"category-filter")
    tags.textContent=element;
    categoryList.appendChild(tags);
    
   });
  }

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
