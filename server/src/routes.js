const UserController = require('./controllers/UserController')

module.exports = (app) => {
    app.post('/register', UserController.register)
}