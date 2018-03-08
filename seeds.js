var mongoose = require("mongoose");
var Campground = require("./models/campground");

//Seed Data
var data = [{
    name: "Under Bridge",
    image: "https://goo.gl/axBtyy",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris euismod."
}, {
    name: "Snowy Jungle",
    image: "https://goo.gl/hckT6R",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris euismod."
}, {
    name: "Cat is blyatful",
    image: "https://goo.gl/XmCcNf",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris euismod."
}, {
    name: "Snowy mountain",
    image: "https://goo.gl/7nW4TJ",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris euismod."
}];


function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Cleared DB successfully!");
            //Add few campgrounds
            data.forEach(function (seed) {
                Campground.create(seed, function (err, campground) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Added Camp Successfully!");
                        Comment.create({
                            text: "This place is great! I wish there was Internet",
                            author: "Deep Bn"
                        }, function (err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Added comment!");
                            }
                        });
                    }
                });
            });
        }
    });
}

module.exports = seedDB;