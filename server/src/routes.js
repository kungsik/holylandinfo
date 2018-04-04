const UserController = require('./controllers/UserController')
const PostController = require('./controllers/PostController')

const AuthenticationPolicy = require('./policies/AuthenticationPolicy')
const isAuthenticated = require('./policies/isAuthenticated')

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

    app.get('/authentification', isAuthenticated)

    app.post('/post/addpost', PostController.addpost)

    app.post('/post/viewpost', PostController.viewpost)
}