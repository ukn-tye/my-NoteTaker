// import express package and paths //

const path = require("path");
const router = require("express").Router();

// GET method to send notes.html //

router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// GET method to send index.html //

router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;