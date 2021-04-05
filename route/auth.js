const express = require("express");
const passport = require("passport");

const Router = express.Router();

// handle user get request
// @desc Auth With Google
// GET / auth/google
Router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

//@desc google Auth Callback
// GET auth/google/callback

Router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/dashboard");
    }
);

//@desc logout user
// GET /auth/logout
Router.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/");
});

module.exports = Router;
