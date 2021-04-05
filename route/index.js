const express = require("express");
const Router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth_middle");
const Story = require("../model/stories_model");

// handle user get request
// @desc login/landing page
// GET /
Router.get("/", ensureGuest, (req, res) => {
   res.render("login", {
      layout: "login",
   });
});

// @desc Dashbord
// @GET /dashbord
Router.get("/dashboard", ensureAuth, async (req, res) => {

   try {
      const stories = await Story.find({ user: req.user.id }).lean()
      res.render("dashboard", {
         name: req.user.fristName,
         stories,
      });

   } catch (error) {
      console.error(error)
      res.render('error/500')
   }


});

module.exports = Router;
