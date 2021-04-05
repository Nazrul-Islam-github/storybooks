


module.exports = {
    /*
This Module For authenticate user ; if user not sign up then redirect user to 
http://localhost:3000/

if is sign up then redirect user to http://localhost:3000/dashboard
*/
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/')
        }
    },



    /*
    if sign up user visit to / 
    then this user redirect to /dashboard

    else 
    this user redirect to "/"
    */
    ensureGuest: function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/dashboard')
        } else {
            return next()
        }
    }
}