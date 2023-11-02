// TODO: Grab the ID from the query string

let queryParams = new URLSearchParams(window.location.search);
let id = queryParams.get("id");
console.log(id);

let form = document.querySelector("form");
let entryTitle = document.getElementById("entry-title");
let author = document.getElementById("author");
let entryBody = document.getElementById("body");

// TODO: Call the fetch function

getEntryById(id);

// TODO: Fetch the job by ID

async function getEntryById(id) {
  let url = `http://localhost:4000/routes/get-by-id/${id}`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data.entry);
  populateForm(data.entry);
}

// TODO: Populate the form with the data

function populateForm(entry) {
  entryTitle.value = entry.title;
  author.value = entry.author;
  entryBody.value = entry.body;
}

// TODO: Add an event listener to the form

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  let entry = {
    title: entryTitle.value,
    author: author.value,
    body: entryBody.value,
  };
  await updateEntry(entry);
  window.location.href = "index.html";
});

// TODO: Update the Entry

async function updateEntry(entry) {
  let url = `http://localhost:4000/routes/update-entry/?id=${id}`;

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: JSON.stringify(entry),
  };
  let response = await fetch(url, requestOptions);
  let data = await response.json();
  console.log(data);
}
