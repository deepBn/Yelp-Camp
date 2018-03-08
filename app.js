var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var SeedDB = require("./seeds");

//APP CONFIG
SeedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

//ROOT ROUTE
app.get("/", function (req, res) {
    res.render("landing");
});

//INDEX ROUTE
app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {
                campgrounds: campgrounds
            });
        }
    });
});

//NEw ROUTE
app.get("/campgrounds/new", function (req, res) {
    res.render("new");
});

//CREATE ROUTE
app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var newCampground = {
        name: name,
        image: image,
        description: desc
    };
    
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//SHOW ROUTE
app.get("/campgrounds/:id", function (req, res) {
    var id = req.params.id;
    Campground.findById(id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {
                campground: campground
            });
        }
    });
});

//START SERVER
app.listen("3000", function () {
    console.log("YelpCamp server is running!");
});