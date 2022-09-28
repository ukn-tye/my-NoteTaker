// require packages  //
const path = require('path');
const express = require("express");
const app = express();

// routes //

const apiRoutes = require("./routes/index.js");
const htmlRoutes = require('./routes/notes.js');

// setup port //

const PORT = process.env.PORT || 3001;

// middleware //

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/api', apiRoutes);
//app.use('/', htmlRoutes);//

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// GET method to send index.html //

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
