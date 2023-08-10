console.log("it works");

//Declarations

let newEntryForm = document.getElementById("new-entry-form");
let deleteEntryForm = document.getElementById("delete-entry-form");

let entryTitle = document.getElementById("entry-title");
let author = document.getElementById("author");
let entryBody = document.getElementById("body");

//!------------------------------------------

// Server Endpoints

let endpoint = {
  entries: "http://localhost:4000/routes/entries",
  entrySearch: "http://localhost:4000/routes/search-entry",
  newEntry: "http://localhost:4000/routes/new-entry",
  updateEntry: "http://localhost:4000/routes/update-entry/",
  deleteEntry: "http://localhost:4000/routes/delete-entry",
};

//!----------------------------------------

async function getAllEntries() {
  try {
    const response = await fetch(endpoint.entries);
    const data = await response.json();
    //!
  } catch (error) {}
}

//!----------------------------------------

// Display Entries

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
    <td><button>Edit</button></td>
  </tr>`;

    tableRows = tableRows + newRows;
  }
  // Display the Table Row of Information about the Entry
  tableBody.innerHTML = tableRows;
}
