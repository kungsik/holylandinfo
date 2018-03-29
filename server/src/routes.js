const UserController = require('./controllers/UserController')
const AuthenticationPolicy = require('./policies/AuthenticationPolicy')

module.exports = (app) => {
    app.post('/register', 
        AuthenticationPolicy.register, 
        UserController.register
    )

    app.post('/login', 
        UserController.login
    )

    app.get('/test', (req, res) => {
        res.send({
            test: 'this is a test'
        })
    })
}