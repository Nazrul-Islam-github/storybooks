const mongoose = require('mongoose')

/*
this model for save google login user information
*/

const UserShcema = new mongoose.Schema({
    googleID: {
        type: String,
        required: true
    },

    displayName: {
        type: String,
        required: true
    },

    fristName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },


    image: {
        type: String,
        required: false
    },
    stories: { type: mongoose.Schema.Types.ObjectId, ref: 'Story' },

    createAt: {
        type: Date,
        default: Date.now
    },
})
const User = mongoose.model('User', UserShcema);
module.exports = User;