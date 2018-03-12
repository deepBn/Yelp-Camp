var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var SeedDB = require("./seeds");

var indexRoutes = require("./routes/index");
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");

//APP CONFIG
SeedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

//AUTH CONFIG
app.use(require("express-session")({
    secret: "Hope I will be a web devoloper one day",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//PASS THE USER DATA TO ALL ROUTES
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

//ROUTES CONFIG
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//START SERVER
app.listen("3000", function () {
    console.log("YelpCamp server is running!");
});