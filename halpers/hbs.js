const moment = require('moment')

module.exports = {
    /*
    This formatDate function for formating date on our hbs template*/

    formatDate: function (date, format) {
        return moment(date).format(format)
    },

    /*
    this fuction for short stories show on localhost:3000/stories
    */
    truncate: function (str, len) {
        if (str.length > len && str.length > 0) {
            let new_str = str + ' '
            new_str = str.substr(0, len)
            new_str = str.substr(0, new_str.lastIndexOf(' '))
            new_str = new_str.length > 0 ? new_str : str.substr(0, len)
            return new_str + '...'
        }
        return str
    },
    /*
    this function for strip html tag when get story body from database*/
    stripTags: function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, '')
    },
    /*
    Edit icon helper  
    */
    editIcon: function (storyUser, loggedUser, storyId, floating = true) {
        if (storyUser._id.toString() == loggedUser._id.toString()) {
            if (floating) {
                return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
            } else {
                return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`
            }
        } else {
            return ''
        }
    },

    /*
    get database status value
   and select story status when story is editing 
    */
    select: function (selected, options) {
        return options
            .fn(this)
            .replace(
                new RegExp(' value="' + selected + '"'),
                '$& selected="selected"'
            )
            .replace(
                new RegExp('>' + selected + '</option>'),
                ' selected="selected"$&'
            )
    },


    deleteIcon: function (storyUser, loggedUser, storyId, floating = true) {
        if (storyUser._id.toString() == loggedUser._id.toString()) {
            if (floating) {
                return `<a href="/stories/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-trash"></i></a>`
            } else {
                return `<a href="/stories/${storyId}"><i class="fas fa-trash"></i></a>`
            }
        } else {
            return ''
        }
    },
}