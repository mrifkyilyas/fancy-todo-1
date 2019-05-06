const {Project}= require('../models/')
module.exports = function(req, res, next) {
    console.log('masuk author')    
    try {
       
        Project.findOne({
            _id: req.params.id
        })
        .then(result => {            
            if(result && result.owner == req.userLogin) {
                console.log('ketemu sama ga')                    
                console.log(req.userLogin)
                next()
            } else {
                throw new Error(`Bad request`)
            }
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
    } catch(err) {
        res.status(400).json({
            message: 'Bad request'
        })
    }
}