const { Task, Project } = require('../models/')
module.exports = function (req, res, next) {

    try {
        console.log('masuk author')
        console.log(req.headers.projectid)
        Project.findOne({
            _id: req.headers.projectid
        })
            .then(result => {
                if (result) {
                    console.log('project ketemu')
                    let exist = result.members.indexOf(req.userLogin) != -1
                    if (exist) {
                        console.log('lolos')
                        next()

                      
                    } else {
                        console.log('project tdk ketemu')
                        throw new Error(`Bad request`)

                    }

                } else {

                }
            })
            .catch(err => {
                console.log('tdk lolos')
                res.status(400).json({
                    message: err.message
                })
            })
    } catch (err) {
        res.status(400).json({
            message: 'Bad request'
        })
    }
}