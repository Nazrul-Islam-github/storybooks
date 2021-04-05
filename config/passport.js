const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/User')
const mongoose = require('mongoose')

/*
thsi model for authenticate user usign google-oauth-20 Strategy*/

module.exports = function googleAuthentication(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            const newUser = {
                googleID: profile.id,
                displayName: profile.displayName,
                fristName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value
            }

            try {
                let user = await User.findOne({ googleID: profile.id });
                if (user) {
                    done(null, user)
                }
                else {
                    user = await User.create(newUser);
                    done(null, user);
                }
            } catch (error) {
                console.error(error);
            }

        }))



    // -----------------serializeUser and  deserializeUser----------
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}