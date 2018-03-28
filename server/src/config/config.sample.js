const path = require('path')

module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: 'mongodb://id:pass@ds125469.mlab.com:25469/gopilgrims'
  },
  secret: 'thisismysecretkey'
}