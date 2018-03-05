var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

var campgrounds = [{
        name: "Salomon Creek",
        image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c85daa025ee04c951b6ac12fe3ba031a&auto=format&fit=crop&w=1950&q=80"
    },
    {
        name: "Boston Boop",
        image: "https://images.unsplash.com/photo-1511701455363-d46ed8e3b728?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d65813b9b3ed6a869d4895f0282988a3&auto=format&fit=crop&w=1950&q=80"
    },
    {
        name: "Salomon Creek",
        image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c85daa025ee04c951b6ac12fe3ba031a&auto=format&fit=crop&w=1950&q=80"
    },
    {
        name: "Boston Boop",
        image: "https://images.unsplash.com/photo-1511701455363-d46ed8e3b728?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d65813b9b3ed6a869d4895f0282988a3&auto=format&fit=crop&w=1950&q=80"
    },
    {
        name: "Salomon Creek",
        image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c85daa025ee04c951b6ac12fe3ba031a&auto=format&fit=crop&w=1950&q=80"
    },
    {
        name: "Boston Boop",
        image: "https://images.unsplash.com/photo-1511701455363-d46ed8e3b728?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d65813b9b3ed6a869d4895f0282988a3&auto=format&fit=crop&w=1950&q=80"
    },
    {
        name: "Salomon Creek",
        image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c85daa025ee04c951b6ac12fe3ba031a&auto=format&fit=crop&w=1950&q=80"
    },
    {
        name: "Boston Boop",
        image: "https://images.unsplash.com/photo-1511701455363-d46ed8e3b728?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d65813b9b3ed6a869d4895f0282988a3&auto=format&fit=crop&w=1950&q=80"
    }
];

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    res.render("campgrounds", {
        campgrounds: campgrounds
    });
});

app.get("/campgrounds/new", function (req, res) {
    res.render("new");
});

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {
        name: name,
        image: image
    };
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");

});

app.listen("3000", function () {
    console.log("YelpCamp server is running!");
});