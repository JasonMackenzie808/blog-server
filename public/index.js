console.log("it works");

//Declarations

let newEntryForm = document.getElementById("new-entry-form");
let deleteEntryForm = document.getElementById("delete-entry-form");

let entryTitle = document.getElementById("entry-title");
let author = document.getElementById("author");
let entryBody = document.getElementById("body");

let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-btn");

//!------------------------------------------

// Server Endpoints

let endpoint = {
  entries: "http://localhost:4000/routes/entries",
  newEntry: "http://localhost:4000/routes/new-entry",
  updateEntry: "http://localhost:4000/routes/update-entry/",
  deleteEntry: "http://localhost:4000/routes/delete-entry/",
};

//!----------------------------------------

async function getAllEntries() {
  try {
    const response = await fetch(endpoint.entries);
    const data = await response.json();
    displayEntries(data.entries);
    populateEntryDropdown(data.entries);
  } catch (error) {
    console.error(error);
  }
}

//!----------------------------------------

// Display Entries
let numberT;
function displayEntries(entries) {
  // Fishing for the table body
  let tableBody = document.querySelector("tbody");
  let tableRows = ``;

  // Loop through entriesArray and build out the table rows
  for (let i = 0; i < entries.length; i++) {
    let newRows = `
    <tr>
    <td>${i + 1}</td>
    <td>${entries[i].title}</td>
    <td>${entries[i].author}</td>
    <td>${entries[i].body}</td>
    <td><button onclick="goToEditURL('${
      entries[i].post_id
    }')">Edit</button></td>
  </tr>`;

    tableRows = tableRows + newRows;
  }
  // Display the Table Row of Information about the Entry
  tableBody.innerHTML = tableRows;
}

getAllEntries();

//!----------------------------------------

// Find Entry By Author

async function findEntryByAuthor(event) {
  event.preventDefault();

  let userSearch = searchInput.value;

  try {
    const response = await fetch(
      `http://localhost:4000/routes/search-entry/${userSearch}`
    );
    const data = await response.json();
    console.log(typeof data.entry);
    console.log(data.entry);
    displayEntries(data.entry);
    6;
  } catch (error) {
    console.error(error);
  }
}

//!----------------------------------------

// Create New Entry

async function createNewEntry(event) {
  event.preventDefault();

  try {
    // Build Header
    let myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");

    // Build Payload
    let bodyObject = {
      title: entryTitle.value,
      author: author.value,
      body: entryBody.value,
    };

    let requestOptions = {
      method: "POST",
      body: JSON.stringify(bodyObject),
      headers: myHeader,
    };

    // Conduct the Fetch
    let response = await fetch(endpoint.newEntry, requestOptions);
    let data = await response.json();
    getAllEntries();
  } catch (error) {
    console.error(error);
  }
  entryTitle.value = "";
  author.value = "";
  entryBody.value = "";
}

//!----------------------------------------

// Populate the Delete Dropdown

function populateEntryDropdown(entries) {
  //Fishing for Select DropDown
  let deleteSelect = document.getElementById("delete-entry");
  let removeOptions = ``;

  //Loop through the jobs
  for (let i = 0; i < entries.length; i++) {
    let optionText = entries[i].title + " - " + entries[i].author;
    let newOptions = `<option value="${entries[i].post_id}">${optionText}</option>`;
    removeOptions = removeOptions + newOptions;
  }
  //Display the new options in the innerHTML
  deleteSelect.innerHTML = removeOptions;
}

// Delete the Selected Option

async function deleteEntry(event) {
  event.preventDefault();
  try {
    let deleteSelect = document.getElementById("delete-entry");
    let requestOptions = {
      method: "DELETE",
    };
    const response = await fetch(
      endpoint.deleteEntry + deleteSelect.value,
      requestOptions
    );
    const data = await response.json();

    getAllEntries();
  } catch (error) {
    console.log(error);
  }
}

//!----------------------------------------

//Update Entries

function goToEditURL(id) {
  window.location.href = "/edit.html?id=" + id;
}
