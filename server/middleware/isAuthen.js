const {jwt} = require('../helpers')
const {User} = require('../models')
module.exports = function (req, res, next) {
    if(req.headers.hasOwnProperty('access_token')) {
        try {
            const decoded = jwt.verify(req.headers.access_token)
            req.userLogin = decoded.id
            next()
        } catch(err) {
            res.status(400).json({
                message: 'Bad request'
            })
        }
    } else {
        res.status(401).json({
            message: 'Unauthenticate'
        })
    }
}