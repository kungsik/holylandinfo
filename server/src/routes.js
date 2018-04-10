const UserController = require('./controllers/UserController')
const PostController = require('./controllers/PostController')
const MapDistanceController = require('./controllers/MapDistanceController')

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

    app.get('/authentification', 
        isAuthenticated
    )

    app.post('/post/addpost', 
        PostController.addpost
    )

    app.post('/post/editpost',
        PostController.editpost
    )

    app.post('/post/viewpost', 
        PostController.viewpost
    )

    app.post('/post/listpost',
        PostController.listpost
    )

    app.post('/post/getpostcount',
        PostController.getpostcount
    )

    app.post('/post/getgeolocation',
        PostController.getgeolocation
    )

    app.post('/map/distance', 
        MapDistanceController.distance
    )



    app.get('/test', (req, res) => {
        res.send({
            test: 'this is a test'
        })
    })
}