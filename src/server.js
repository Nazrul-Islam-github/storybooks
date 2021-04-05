// import module
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose')
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override')
const app = express();

// -----Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ---connect mongoDB
const connectDB = require('../config/db');
connectDB();


// delete edit on mongodb meddleware 
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
    }
}))

// --
if (process.env.NODE_ENV === 'devlopment') {
    app.use(morgan('dev'))
}



// load config
const configFilePath = path.join(__dirname, "../config/config.env")
dotenv.config({ path: configFilePath })

// passport config 
require('../config/passport')(passport)

// ------------For Get Data---------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ---------------For Static File-----------
const static_path = path.join(__dirname, '../public')
app.use(express.static(static_path))



// ---------------SET VIEW ENGINE--------------]
// handle helpers
/*
formatDate for formation date on hbs teplates*/
const { formatDate, stripTags, truncate, editIcon, select, deleteIcon } = require('../halpers/hbs');



// -----------     ------------
const templates_path = path.join(__dirname, '../views')
const partials_path = path.join(__dirname, '../layouts')
app.engine('hbs', exphbs({
    helpers: {
        formatDate, //this is formate date helper 
        stripTags,//this is strip html tag helper
        truncate,//this is short stories helper
        editIcon  //this edit button helper
        , select//select public or private option when story is editing

    }, defaultLayout: 'main', extname: 'hbs'
}))
app.set('view engine', 'hbs')

// session meddle ware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // store: new MongoStore({ mongooseConnection: mongoose.connection }) // get session data when server resatrt without login

    //-------- get session data when server resatrt without login
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        dbName: 'newusers',
    })

}))


// passport middleware ;
app.use(passport.initialize());
app.use(passport.session());

// global variable
app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    next()
})

// route
app.use('/', require('../route/index'));
app.use('/user', require('../route/user'));
app.use('/auth', require('../route/auth'));
app.use('/stories', require('../route/srories'));


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`The Server Up And Running on Port ${process.env.NODE_ENV} and port ${PORT}`);
})