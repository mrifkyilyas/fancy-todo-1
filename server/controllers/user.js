const { Task, User } = require('../models')
const { bcrypt, jwt } = require('../helpers')
const { OAuth2Client } = require('google-auth-library')
const CLIENT_ID = "279578333779-le6son4i7oepdkjvllnsvca5k1ste2va.apps.googleusercontent.com"
const client = new OAuth2Client(CLIENT_ID)
class controllerUser {
    static register(req, res) {
        const { name, email, password } = req.body
        User.create({
            name, email, password
        })
            .then(success => {
                res.status(201).json(success)
            })
            .catch(err => {
                if (err.errors.name) {
                    res.status(400).json({
                        message: err.errors.name.message
                    })
                } else if (err.errors.email) {
                    res.status(400).json({
                        message: err.errors.email.message
                    })
                } else if (err.errors.password) {
                    res.status(400).json({
                        message: err.errors.password.message
                    })
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static login(req, res) {
        User.findOne({
            email: req.body.email
        })
            .then(found => {
                if (found && bcrypt.compare(req.body.password, found.password)) {
                    let token = jwt.sign({
                        id: found._id,
                        email: found.email
                    })
                    console.log(token)
                    res.status(200).json({
                        name: found.name,
                        access_token: token,
                        email: found.email
                    })

                } else {
                    res.status(400).json({
                        message: 'password yang anda masukan salah'
                    })
                }

            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static googleLogin(req, res) {
        console.log('masuk')
        client
            .verifyIdToken({
                idToken: req.body.token,
                audience: CLIENT_ID
            })
            .then(ticket => {
                let payload = ticket.getPayload()
                return Promise.all([User
                    .findOne({
                        email: payload.email
                    }), payload
                ])
            })
            .then(([user, payload]) => {
                if (!user) {
                    console.log('akun baru')
                    // console.log(payload,'ini payload')
                    return User
                        .create({
                            name: payload.name,
                            email: payload.email,
                            password: `lalala`,
                        })

                } else {
                    console.log('udah ada')
                    return user
                }
            })
            .then(user => {
                const token = jwt.sign({
                    id: user._id,
                    email: user.email,

                })

                res.status(200).json({
                    access_token: token,
                    name: user.name,
                    email: user.email
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static getUserByEmail(req, res) {
        User.findOne({
            email: req.params.email
        })
            .then(user => {
                if (user) {
                    res.status(200).json(user)
                } else {
                    res.status(404).json({
                        message: 'User not found'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = controllerUser