const passport = require('passport')

module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    if (err || !user) {
      res.status(403).send({
        error: '회원 전용 기능입니다.'
      })
    } else {
      req.user = user
      res.send({
        message: "success"
      })
      next()
    }
  })(req, res, next)
}   