var express = require("express"),
    bodyParser = require("body-parser"),
    mongodb = require("mongodb"),
    ObjectID = mongodb.ObjectID,
    POSTCARDS_COLLECTION = 'postcards';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

var app = express();
app.use(bodyParser.json());

let ENV = {
    MLAB_API_KEY: process.env.MLAB_API_KEY || "7NUQeWATWY1yb9jPVH46mffYWOEkCcMj",
    MLAB_URI: process.env.MLAB_URI || "https://api.mlab.com/api/1/ds155674/postcards/",
    MLAB_URL: process.env.MLAB_URL || "mongodb://viddamao:9075303364lGKD@ds155674.mlab.com:55674/postcards"
};

console.log(process.env)

var mongodb = require('mongodb');
console.log(ENV['MLAB_URL'])
var url = ENV['MLAB_URL'];
var db;
mongodb.MongoClient.connect(url, function(err, database) {

    if (err) throw err;
    db = database;

    // Initialize the app.
    var server = app.listen(process.env.PORT || 80, function() {
        var port = server.address().port;
        console.log("App now running on port", port);
    });

});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error": message });
}

/*  "/api/postcards"
 *    GET: finds all postcards
 *    POST: creates a new postcard
 */

app.get("/api/postcards", function(req, res) {
    db.collection(POSTCARDS_COLLECTION).find({}).toArray(function(err, cards) {
        if (err) {
            handleError(res, err.message, "Failed to get postcards.");
        } else {
            res.status(200).json(cards);
        }
    });
});

app.post("/api/postcards", function(req, res) {});