const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const router = require("express").Router();
const dbPath = "./api/blog.json";

let endpoint = {
  comments: "http://localhost:4000/routes/entries",
  commentSearch: "http://localhost:4000/routes/search-entry",
  newEntry: "http://localhost:4000/routes/new-entry",
  updateEntry: "http://localhost:4000/routes/update-entry/",
  deleteEntry: "http://localhost:4000/routes/delete-entry",
};
//!------------------------------------------------------------
// Get All Entries Endpoint

router.get("/entries", (req, res) => {
  let entriesArray = read();
  console.log(entriesArray);
  res.json({ message: "Success", entries: entriesArray });
});

//!------------------------------------------------------------
// Get Specific Entry By Author Endpoint

router.get("/search-entry/:author", (req, res) => {
  const { author } = req.params;
  console.log(req.params);
  let entriesArray = read();
  console.log(entriesArray);

  let entryInfo = findOne(entriesArray, author);
  console.log(entryInfo);
  if (entryInfo === undefined) {
    res.json({ error: "Invalid entry author" });
  } else {
    res.json({ message: "Entry found.", entry: entryInfo });
  }
});

//!------------------------------------------------------------

//Get Specific Entry By ID Endpoint

router.get("/get-by-id/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  let entriesArray = read();

  let entryInfo = findOneById(entriesArray, id);

  if (entryInfo === undefined) {
    res.json({ error: "Invalid entry ID" });
  } else {
    res.json({ message: "Entry found.", entry: entryInfo });
  }
});

//!------------------------------------------------------------
// Create New Entry Endpoint

router.post("/new-entry", (req, res) => {
  const { title, author, body } = req.body;

  let entriesArray = read();

  let post_id = uuidv4();

  entriesArray.push({ post_id, title, author, body });

  save(entriesArray);

  res.json({ message: "Successfully added entry", entries: entriesArray });
});

//!------------------------------------------------------------
// Update Entry Endpoint

router.patch("/update-entry/", (req, res) => {
  const { id } = req.query;
  //Read file
  let entriesArray = read();
  // Modifying the data
  entriesArray = updateOne(entriesArray, id, req.body);

  // Save the data to the file
  save(entriesArray);
  res.json({ message: "Successfully Updated Entry", entries: entriesArray });
});

//!------------------------------------------------------------
// Delete Entry Endpoint

router.delete("/delete-entry/:id", (req, res) => {
  const { id } = req.params;
  // Read File
  let entriesArray = read();
  // Modify File
  entriesArray = removeOne(entriesArray, id);
  // Save data to file
  save(entriesArray);

  res.json({ message: "Successfully deleted entry.", entries: entriesArray });
});

//!------------------------------------------------------------
// Helper Functions

// ! Read Function

function read() {
  const file = fs.readFileSync(dbPath);
  return JSON.parse(file);
}

// ! Save Function

function save(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data));
}

// ! Find Functions

function findOne(array, author) {
  let userEntry = array.filter(
    (entry) => entry.author.toLowerCase() === author.toLowerCase()
  );
  if (userEntry.length > 0) {
    return userEntry;
  } else {
    return undefined;
  }
}

function findOneById(array, id) {
  let userEntry = array.filter((entry) => entry.post_id === id);
  if (userEntry.length > 0) {
    return userEntry[0];
  } else {
    return undefined;
  }
}

// ! Update Function

function updateOne(originalArray, id, updatedInfo) {
  originalArray.forEach((item) => {
    if (item.post_id === id) {
      let index = originalArray.indexOf(item);
      let updatedItem = { ...item, ...updatedInfo };
      originalArray[index] = updatedItem;
    }
  });
  return originalArray;
}

// ! Delete Function

// Deleting
function removeOne(originalArray, id) {
  let modifiedArray = originalArray.filter((item) => item.post_id !== id);
  return modifiedArray;
}

module.exports = router;
