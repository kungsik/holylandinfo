// const UserController = require('./controllers/UserController')

module.exports = (app) => {
    // app.post('/register', UserController.register)
    app.get('/test', (req, res) => {
        res.send({
            test: 'this is a test'
        })
    })
}