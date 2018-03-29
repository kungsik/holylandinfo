const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

//관리자 지위를 부여
function assignAdmin(user) {
  NewUser = new user
  NewUser.admin = true
  NewUser.save()
}

//인증정보를 위한 토큰값을 생성 (1주일 후에 소멸)
function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.secret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    //신규회원 등록. 첫번째 회원은 자동으로 admin으로 등록됨.
    async register (req, res) {      
      await User.count({}, function(err, count) {
        if(!count) {
          req.body.admin = true
          message = 'admin으로 등록되었습니다.'
        } else { message = '' }
        User.create(req.body, function(err, user) {
          if(err) {
            res.status(400).send({ error: '이메일이 중복되었거나 오류가 발생했습니다.' })
          }
          else {
            res.send({
              user: user,
              message: '성공적으로 등록되었습니다.' + message
            })
          }
        })
      })
    },
    async login (req, res) {
      try {
        const {email, password} = req.body
        const user = await User.findOne({ email: email })
  
        if (!user) {
          return res.status(403).send({
            error: '입력하신 이메일은 사용자로 등록되어 있지 않습니다.'
          })
        }

        console.log(user)
  
        const isPasswordValid = await user.comparePassword(password)
        if (!isPasswordValid) {
          return res.status(403).send({
            error: '비밀번호가 맞지 않습니다.'
          })
        }
  
        const userJson = user.toJSON()
        res.send({
          user: userJson,
          token: jwtSignUser(userJson)
        })
      } catch (err) {
        res.status(500).send({
          error: '로그인 중 오류가 발생했습니다. 다시 시도해 주세요.'
        })
      }
    }
}

