var express = require("express");
var router = express.Router({
    mergeParams: true
});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//NEW ROUTE
router.get("/new", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {
                campground: campground
            });
        }
    });
});

//POST ROUTE
router.post("/", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    req.flash("error", "Something went wrong");
                    res.redirect("/campgrounds/" + campground["_id"]);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Comment added successfully");
                    res.redirect("/campgrounds/" + campground["_id"]);
                }
            });
        }
    });
});

//EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err || !campground) {
            req.flash("error", "Campground not found");
            return res.redirect("back");
        } else {
            Comment.findById(req.params.comment_id, function (err, comment) {
                if (err) {
                    req.flash("error", "Comment not found!");
                    res.redirect("back");
                } else {
                    res.render("comments/edit", {
                        campground_id: req.params.id,
                        comment: comment
                    });
                }
            });
        }
    });
});

//UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err) {
        if (err) {
            console.log(err);
        } else {
            req.flash("success", "Comment edited successfully");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            console.log(err);
        } else {
            req.flash("success", "Comment deleted successfully");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;