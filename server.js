var express = require("express"),
    bodyParser = require("body-parser"),
    mongodb = require("mongodb"),
    ObjectID = mongodb.ObjectID,
    POSTCARDS_COLLECTION = 'postcards',
    CATEGORIES_COLLECTION = 'categories';

var app = express();
app.use(bodyParser.json());

var db;
mongodb.MongoClient.connect(process.env.MLAB_URL, function(err, database) {

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


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*  "/api/postcards"
 *    GET: finds all postcards
 *    POST: creates a new postcard
 */

app.get("/api/postcards", function(req, res, next) {
    db.collection(POSTCARDS_COLLECTION).find({}).toArray(function(err, cards) {
        if (err) {
            handleError(res, err.message, "Failed to get postcards.");
        } else {
            res.status(200).json(cards);
        }
    });
});

app.post("/api/postcards", function(req, res, next) {});

app.get("/api/categories", function(req, res, next) {
    db.collection(CATEGORIES_COLLECTION).find({}).toArray(function(err, categories) {
        if (err) {
            handleError(res, err.message, "Failed to get categories.");
        } else {
            res.status(200).json(categories);
        }
    });
});

app.post("/api/categories", function(req, res, next) {});