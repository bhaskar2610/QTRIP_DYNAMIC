import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let res = await fetch(config.backendEndpoint + '/reservations/');
    let data = await res.json();
    return data;
  } catch (err) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
 // console.log(reservations);
 if(reservations.length===0){
  document.getElementById("no-reservation-banner").style.display = "block";
  document.getElementById("reservation-table-parent").style.display = "none";
 }else{
  document.getElementById("no-reservation-banner").style.display = "none";
  document.getElementById("reservation-table-parent").style.display = "block";
  let table = document.getElementById('reservation-table');
  let parentTable = document.getElementById('reservation-table-parent');
    reservations.forEach(details => {
      let tableRow = document.createElement('tr');
      let currentDate = new Date(details.date);
      let fomattedDate = currentDate.toLocaleDateString("en-IN");

      const bookDate = new Date(details.time).toLocaleString("en-IN", {
        dateStyle: "long",
      });
      const bookTime = new Date(details.time).toLocaleString("en-IN", {
        timeStyle: "medium",
      });
      const finalBookTime = bookDate + ", " + bookTime;

      let buttonComponent = `
      <div class="reservation-visit-button" id=${details.id}> 
          <a href="../detail/?adventure=${details.adventure}">Visit Adventure</a>     
       </div>`;
      
      tableRow.innerHTML = `
    <td scope="col">${details.id}</td>
    <td scope="col">${details.name}</td>
    <td scope="col">${details.adventureName}</td>
    <td scope="col">${details.person}</td>
    <td scope="col">${fomattedDate}</td>
    <td scope="col">${details.price}</td>
    <td scope="col">${finalBookTime}</td>
    <td scope="col">${buttonComponent}</td>
    `
      table.appendChild(tableRow);
    });
  }
}

export { fetchReservations, addReservationToTable };
