var express = require("express");
var app = express();
var flash = require("connect-flash");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var User = require("./models/user");
// var Campground = require("./models/campground");
// var Comment = require("./models/comment");
// var SeedDB = require("./seeds");

var indexRoutes = require("./routes/index");
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");

//APP CONFIG
//SeedDB();
//mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://deepbn:deepbn@ds113435.mlab.com:13435/yelp_camp");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));
app.use(flash());

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

//PASS DATA TO VIEWS DIRECTORY
app.use(function (req, res, next) {
    //PASS THE USER DATA TO ALL ROUTES
    res.locals.currentUser = req.user;
    //PASS THE FLASH MESSAGE TO ALL ROUTES
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//ROUTES CONFIG
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//START SERVER
app.listen(process.env.PORT||8080, function () {
    console.log("YelpCamp server is running!");
});