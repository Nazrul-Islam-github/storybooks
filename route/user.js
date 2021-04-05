const express = require('express');
const Router = express.Router();

// handle user get request
Router.get('/login',(req,res)=>{
    res.json({massage:"this is login page"})
})


module.exports = Router;