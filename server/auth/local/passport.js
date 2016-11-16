import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

function localAuthenticate(CustomerUser, email, password, done) {
  CustomerUser.find({
    where: {
      email: email.toLowerCase()
    }
  })
    .then(user => {
      if(!user) {
        return done(null, false, {
          message: 'This email is not registered.'
        });
      }
      user.authenticate(password, function(authError, authenticated) {
        if(authError) {
          return done(authError);
        }
        if(!authenticated) {
          return done(null, false, { message: 'This password is not correct.' });
        } else {
          return done(null, user);
        }
      });
    })
    .catch(err => done(err));
}

export function setup(CustomerUser/*, config*/) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  }, function(email, password, done) {
    return localAuthenticate(CustomerUser, email, password, done);
  }));
}
