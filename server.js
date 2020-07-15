// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

//Displays all notes
app.get("/api/notes", function (req, res) {    
    fs.readFile("db.json", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
        res.json(JSON.parse(data))
      });
});

//Handles new Note posting
app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    fs.readFile('db.json',"utf8", function (err, data) {
        var json = JSON.parse(data);
        newNote.uniqueID = json.length + 1
        json.push(newNote);
        fs.writeFile("db.json", JSON.stringify(json), function (err) {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
    })
});


