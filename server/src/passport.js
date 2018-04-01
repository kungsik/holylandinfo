const passport = require('passport')
const User = require('./models/user')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = require('./config/config')

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader("x-access-token"),
    secretOrKey: config.secret
  }, async function (jwtPayload, done) {
    try {
      const user = await User.findOne({ email: jwtPayload.email })
      if (!user) {
        return done(new Error(), false)
      }
      return done(null, user)
    } catch (err) {
      return done(new Error(), false)
    }
  })
)

module.exports = null