//load bcrypt
//var bCrypt = require('bcrypt-nodejs');
module.exports = function (passport, user) {

    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    //Login
    passport.use('login', new LocalStrategy(

        {
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            session: false // disable session to let the token auth. (delete line if you want a session strategy)
        },

        function (email, password, done) {

            var User = user;

            var isValidPassword = function (userpass, password) {
                return password === userpass;
            }

            User.findOne({ where: { email: email } }).then(function (user) {
                // verification si l'username existe
                if (!user) {
                    return done(null, false, { message: 'Invalid password or email' });
                }
                // verification si les mdp correspondent
                if (!isValidPassword(user.Password, password)) {
                    return done(355, false, { message: 'Invalid email or password' });
                }
                // les username et le mdp sont corrects
                var userinfo = user.get();
                return done(null, userinfo);

            }).catch(function (err) {
                return done(364, false, { message: 'Something went wrong with your Signin' + err });
            });

        }
    ));

}