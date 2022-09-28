const app = require("express").Router();
const fs = require("fs");
const util = require("util");
let notesData;

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

app.get("/notes", function (req, res) {

    readFileAsync("db/db.json", "utf8").then(function (data) {

        // parse data to get an array of objects //

        notesData = JSON.parse(data);
        res.json(notesData);
      });
});

app.post("/notes", function (req, res) {
    readFileAsync("db/db.json", "utf8").then(function (data) {

    
    notesData = JSON.parse(data);

    let newNote = req.body;
    let currentID = notesData.length;

    newNote.id = currentID + 1;

    notesData.push(newNote);

    notesData = JSON.stringify(notesData);

    writeFileAsync("db/db.json", notesData).then(function (data) {
      console.log("Note has been added.");
    });
    res.json(notesData);
  });
});


// DELETE function to remove notes from database //

app.delete("/notes/:id", (req, res) => {
    let ID = parseInt(req.params.id);

    for (let i = 0; i < notesData.length; i++) {
        if (ID === notesData[i].id) {
          notesData.splice(i, 1);
          let noteJSON = JSON.stringify(notesData, null, 2);
    
          writeFileAsync("db/db.json", noteJSON).then(function () {
            console.log("Note has been deleted.");
          });
        }
      }
      res.json(notesData);
    });

module.exports = app;