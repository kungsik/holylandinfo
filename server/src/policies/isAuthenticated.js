const passport = require('passport')

module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    if (err || !user) {
      res.status(403).send({
        error: '인증 과정에 문제가 생겼습니다. 자동으로 로그아웃되었습니다.'
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