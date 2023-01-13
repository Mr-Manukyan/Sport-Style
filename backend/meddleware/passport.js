const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('../config/keys')
const mongoose = require('mongoose')
const User = mongoose.model('users')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt,
    ignoreExpiration: false
   
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
            
                const user = await User.findById(payload._id).select('_id')
                if (user) {
                  return  done(null, user)
                } else {
                  return  done(null, false)
                }
            }catch (e){
              console.log("passportJS-error",e)   
            }
        
        })
    )

}