const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
        username: Joi.string().required(),
        email: Joi.string().email(),
        password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }

    const {error} = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: '이메일 형식이 올바르지 않습니다.'
          })
          break
        case 'password':
          res.status(400).send({
            error: `비밀번호는 다음과 같은 형식으로 입력해 주세요.:
              <br>
              1. 다음의 글자들만 가능합니다: 영문 소문자, 대문자, 숫자.
              <br>
              2. 허용되는 길이는 8자와 32자 사이입니다.
            `
          })
          break
        case 'username':
          res.status(400).send({
              error: '이름이 입력되지 않았습니다.'
          })
        default:
          res.status(400).send({
            error: '가입 도중 오류가 발생했습니다. 다시 시도해 주세요.'
          })
      }
    } else {
      next()
    }
  }
}