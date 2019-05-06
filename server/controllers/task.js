const { Task, User } = require('../models')
class controllerTask {
    static create(req, res) {
        console.log('masuk create')
        const user = req.userLogin
        console.log(req.body)
        const { title, description, duedate,status}  = req.body  
        console.log(user);
        
        Task
            .create({ ...req.body,user
             })
            .then(success => {
                res.status(201).json(success)
                console.log('berhasil')
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static createTaskProject(req, res) {
        console.log('masuk create')
        const projectId = req.params.id
        console.log(req.body)
        const { title, description, duedate,status}  = req.body  
        // console.log(user);
        
        Task
            .create({ ...req.body,projectId
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
        console.log(req.userLogin)
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

    static deleteTask(req, res) {
        console.log('masuk delete')
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
    static deleteTaskProject(req, res) {
        console.log('masuk delete')
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
        console.log('masuk')
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

    static updateTaskProject(req, res) {
        console.log('masuk')
        Task.
            findOneAndUpdate({
                projectId: req.headers.projectId
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
}

module.exports = controllerTask