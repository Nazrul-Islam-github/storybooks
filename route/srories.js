const express = require("express");
const { route } = require(".");
const Router = express.Router();
const { ensureAuth } = require("../middleware/auth_middle");
const { findOneAndUpdate } = require("../model/stories_model");
const Story = require("../model/stories_model");

// handle user get request
// @desc show add page
// GET /stories/add
Router.get("/add", ensureAuth, (req, res) => {
    res.render("stories/add");
});


// @desc handle submit post  request handle
// POST /stories
Router.post("/", ensureAuth, async (req, res) => {
    // console.log(req.body.user);
    try {
        req.body.user = req.user.id
        console.log(req.body.user);
        const newStories = req.body
        await Story.create(newStories)
        res.redirect('/dashboard')
        // console.log(newStories);

    } catch (error) {
        console.error(error);
        res.render('error/500')
    }
});

// @desc this route for show all public stories
// GET /stories

Router.get('/', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ status: 'public' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('stories/index', {
            stories
        })

        // console.log(stories);

    } catch (error) {
        // console.error(error)
        return res.render('error/500')
    }
})


// show sigle story page
// @GET /stories/:id
Router.get('/:id', ensureAuth, async (req, res) => {
    try {
        let story = await Story.findById(req.params.id)
            .populate('user')
            .lean()
        // if story not found
        if (!story) {
            return res.render('error/404')
        }
        else {
            res.render('stories/show_single_page_story', {
                story
            })
        }
    } catch (error) {
        return res.render('error/500')
    }
})

// show one single user all stories
Router.get('/user/:userId', ensureAuth, async (req, res) => {
    try {
        const AllStories = await Story.find({
            user: req.params.userId,
            status: 'public'
        })
            .populate('user')
            .lean()
        res.render('stories/user_all_stories', {
            AllStories
        })
    } catch (error) {
        console.error(error);
        return res.render('error/500')
    }
})

// GET /stories/edit/:id
// @desc show edit page
Router.get("/edit/:id", ensureAuth, async (req, res) => {

    try {
        const story = await Story.findOne({
            _id: req.params.id
        }).lean()
        // if there no story then render 404 page
        if (!story) {
            return res.render('error/404')
        }
        // if login user id != story.user then redirect user to /stories psge
        if (story.user != req.user.id) {
            res.redirect('/stories', {
                story
            })
        }
        else {
            res.render('stories/edit_stories', {
                story,
            })
        }
    } catch (error) {
        console.error(error);
        res.render('error/500')
    }
});

// @desc Update stories 
// PUT /stories/:id
Router.put('/:id', ensureAuth, async (req, res) => {
    try {
        let story = await Story.findById(req.params.id).lean()
        // if no story found
        if (!story) {
            return res.render('error/404')
        }

        // if login user id != story.user then redirect user to /stories psge
        if (story.user != req.user.id) {
            res.redirect('/stories', {
                story
            })
        }
        // update story
        else {
            story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true
            })

            res.redirect('/dashboard')
        }
    } catch (error) {
        console.error(error)
        return res.render('error/500')
    }

})


// @DESC Delete story
// @route /stories/:id
Router.delete('/:id', ensureAuth, async (req, res) => {
    try {
        await Story.remove({ _id: req.params.id })
        res.redirect('/dashboard')
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
})





module.exports = Router;
