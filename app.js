var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");

//APP CONFIG
mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

/* Campground.create({
    name: "Boston Boop",
    image: "https://images.unsplash.com/photo-1511701455363-d46ed8e3b728?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d65813b9b3ed6a869d4895f0282988a3&auto=format&fit=crop&w=1950&q=80",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce elit justo, ornare id dui vel, fermentum aliquam diam. Aliquam commodo diam ut enim tincidunt sodales. Praesent at purus sem. Nulla tincidunt metus vitae mollis imperdiet. Morbi risus turpis, efficitur at magna at, rhoncus aliquet neque. Integer vehicula elementum nulla, at hendrerit orci rhoncus sed. Praesent lacus elit, vulputate eu purus a, rhoncus egestas sapien. Sed convallis, justo vel ultrices porta, nunc felis scelerisque lorem, sit amet tristique orci dui ac justo. Morbi libero libero, feugiat quis bibendum eget, ultricies ut nisl. Pellentesque finibus interdum maximus. Quisque et imperdiet elit. In."
}, function (err, campground) {
    if (err) {
        console.log(err);
    } else {
        console.log("Campground created: ");
        console.log(campground);
    }
}); */

/* var campgrounds = [{
        name: "Salomon Creek",
        image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c85daa025ee04c951b6ac12fe3ba031a&auto=format&fit=crop&w=1950&q=80"
    },
    {
        name: "Boston Boop",
        image: "https://images.unsplash.com/photo-1511701455363-d46ed8e3b728?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d65813b9b3ed6a869d4895f0282988a3&auto=format&fit=crop&w=1950&q=80"
    }
]; */

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