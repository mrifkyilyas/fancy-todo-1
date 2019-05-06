
const router = require('express').Router()
const task = require('./task')
const project = require('./project')
const {User} = require('../controllers')
const authen = require('../middleware/isAuthen')

router.post('/register',User.register)
router.post('/login',User.login)
router.post('/google-login',User.googleLogin)
router.get('/user/:email',authen,User.getUserByEmail)
router.use('/task',task)
router.use('/project',project)








module.exports = router