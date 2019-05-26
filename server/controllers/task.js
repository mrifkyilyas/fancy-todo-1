const { Task, User } = require('../models')
class controllerTask {
    static create(req, res) {
        const user = req.userLogin
        console.log(req.body)
        const { title, description, duedate, status } = req.body
        console.log(user);

        Task
            .create({
                ...req.body, user
            })
            .then(success => {
                res.status(201).json(success)
                console.log('berhasil')
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

   
    static getAllTask(req, res) {
        Task
            .find({})
            .populate('user')
            .then(task => {
                res.status(200).json(task)

            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getAllTaskByUser(req, res) {
        Task
            .find({ user: req.userLogin })
            .populate('user')
            .then(task => {
                res.status(200).json(task)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
   
    static deleteTask(req, res) {
        Task
            .findOneAndDelete({
                _id: req.params.id
            })
            .then(task => {
                if (task) {
                    res.status(200).json({
                        message: 'task successfully deleted'
                    })
                } else {
                    res.status(404).json({
                        message: 'task not found'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
   
    static updateTask(req, res) {
        Task.
            findOneAndUpdate({
                _id: req.params.id
            }, {
                    ...req.body
                }, {
                    new: true
                })
            .then(task => {
                console.log(task)
                if (task) {
                    res.status(200).json(task)
                } else {
                    res.status(404).json({
                        message: 'Task not found'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static updateStatus(req, res) {
        Task.
            findOne({
                _id: req.params.id
            })
            .then(task => {
                console.log(task)
                if (task) {
                    if(task.status==="true"){
                        task.status = false
                    }else{
                        task.status = true
                    }
                    return task.save()
                } else {
                    res.status(404).json({
                        message: 'Task not found'
                    })
                }
            })
            .then(task => {
                res.status(200).json(task)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }


    static createTaskProject(req, res) {
        const projectId = req.params.id
        console.log(req.body)
        const { title, description, duedate, status } = req.body
        // console.log(user);

        Task
            .create({
                ...req.body, projectId
            })
            .then(success => {
                res.status(201).json(success)
                console.log('berhasil')
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }


    static getAllTaskByProject(req, res) {
        Task
            .find({ projectId: req.params.id })
            .populate('project')
            .then(task => {
                res.status(200).json(task)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }


   

}

module.exports = controllerTask