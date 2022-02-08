import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  try {
    const urlParams = new URLSearchParams(search);
    let city = urlParams.get("adventure");
    return city;
  } catch (err) {
    return null;
  }
  //console.log(search);

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let res = await fetch(
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`
    );
    let data = await res.json();
    return data;
  } catch (err) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let adventureHeading = document.getElementById("adventure-name");
  adventureHeading.textContent = adventure.name;
  let adventureSubtitle = document.getElementById("adventure-subtitle");
  adventureSubtitle.textContent = adventure.subtitle;
  let photoGallery = document.getElementById("photo-gallery");
  adventure.images.forEach((link) => {
    let imageContainer = document.createElement("div");
    imageContainer.innerHTML = `
        <img class="activity-card-image" src=${link}>
      `;
    photoGallery.appendChild(imageContainer);
  });
  let adventureContent = document.getElementById("adventure-content");
  let contentPara = document.createElement("p");
  contentPara.textContent = adventure.content;
  adventureContent.appendChild(contentPara);
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let newPhotoGalleryDivElement = document.getElementById("photo-gallery");
  newPhotoGalleryDivElement.innerHTML =
    '<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel"><ol id="carouselOrderedList" class="carousel-indicators"></ol><div class="carousel-inner"></div><a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only"></span></a><a class="carousel-control-next" href="#carouselExampleIndicators" role="button"data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only"></span></a></div>';
  
  
    let carouselOL = document.getElementsByClassName("carousel-indicators");
  let carouselInnerDiv = document.getElementsByClassName("carousel-inner");

  
  for (let index = 0; index < images.length; index++) {
    let list_item = document.createElement("li");
    list_item.setAttribute("data-taregt", "#carouselExampleIndicators");
    list_item.setAttribute("data-slide-to", index.toString());
    let img_div = document.createElement("div");
    let img = document.createElement("img");
    img.setAttribute("class", "activity-card-image d-block w-100");
    img.setAttribute("src", images[index]);
    if (index == 0) {
      list_item.setAttribute("class", "active");
      img_div.setAttribute("class", "carousel-item active");
    } else {
      img_div.setAttribute("class", "carousel-item");
    }
    img_div.appendChild(img);
    carouselInnerDiv[0].appendChild(img_div);
    carouselOL[0].appendChild(list_item);
  }
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let reserve = document.getElementById("reservation-panel-available");
  let costPerHead = document.getElementById("reservation-person-cost");
  let soldOut = document.getElementById("reservation-panel-sold-out");
  if (adventure.available) {
    soldOut.style.display = "none";
    costPerHead.textContent = adventure.costPerHead;
    reserve.style.display = "block";
  } else {
    soldOut.style.display = "block";
    reserve.style.display = "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let numberOfPeople = parseInt(persons);
  let costPerHead = parseInt(adventure.costPerHead);
  let totalCost = numberOfPeople * costPerHead;
  document.getElementById("reservation-cost").textContent = totalCost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let myForm = document.getElementById("myForm");
  myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let allInput = document.querySelectorAll("input");
    let userDetail = {
      name: allInput[0].value,
      date: allInput[1].value,
      person: allInput[2].value,
      adventure: adventure.id,
    };
    let dataToSend = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetail),
    };
    fetch(config.backendEndpoint + "/reservations/new", dataToSend).then(
      (data) => {
        if (!data.ok) {
          alert("Failed!");
          throw Error(data.status);
        } else {
          alert("Success!");
          return data.json();
        }
      }
    );
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let reservedBanner = document.getElementById("reserved-banner");
  if (adventure.reserved) {
    reservedBanner.style.display = "block";
  } else {
    reservedBanner.style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
