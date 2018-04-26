const path = require('path')
const crypto = require('crypto')

//db정보, 암호키, 구글맵 api, 암호화 메소드
module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: 'mongodb://id:pw@ds125469.mlab.com:25469/gopilgrims'
  },
  secret: 'thisismysecretkey',
  mapApi: '',
  encryptpass (password) {
    const encrypted = crypto.createHmac('sha1', this.secret)
      .update(password)
      .digest('base64')
    return encrypted
  }
}