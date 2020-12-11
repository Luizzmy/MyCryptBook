const User = require('../models/User');
const passport = require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy

passport.use(User.createStrategy());

passport.use(new GoogleStrategy({
  clientID:process.env.GOOGLE_ID,
  clientSecret:process.env.GOOGLE_secret,
  callbackURL:'/auth/google/callback'
},
async (_,__, {id, name, emails, photos}, done)=>{
  const user=await User.findOne({googleID:id})
  
  if (!user){
      const newUser=await User.create({
          googleID:id,
          email:emails[0].value,
          name:name.givenName,
          lastname:name.familyName,
          image:photos[0].value

      })
      done(null, newUser)
      return
  }

  done(null,user)
}
))

passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });
  passport.deserializeUser(async (id, cb) => {
    try { 
      const user = await User.findById(id)
      cb(null, user)
    }
    catch (err) {
      cb(err);
    }
  });


module.exports = passport;
