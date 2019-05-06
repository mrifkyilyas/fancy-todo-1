const { Project, User } = require('../models')
class controllerProject {
    static createProject(req, res) {
        const { name } = req.body
        const owner = req.userLogin
        Project.findOne({
            name
        })
            .then(project => {
                if (!project) {
                    Project.create({
                        name, owner
                    })
                        .then(project => {
                            project.members.push(project.owner)
                            return project.save()
                        })
                        .then(prjk => {
                            res.status(201).json(prjk)
                        })
                        .catch(err => {
                            if (err.errors.name) {
                                res.status(400).json({
                                    message: err.errors.name.message
                                })
                            } else {
                                res.status(500).json(err)
                            }
                        })
                } else {
                    res.status(400).json({
                        message: 'Project already registered'
                    })
                }
            })
            .catch(err => {
            })
    }

    static deleteProject(req, res) {
        Project.findOneAndDelete({
            _id: req.params.id
        })
            .then(project => {
                if (project) {
                    res.status(200).json({
                        message: 'Project successfully deleted'
                    })
                } else {
                    res.status(404).json({
                        message: 'Project not found'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getAllProject(req, res) {
        Project.find({
            members: req.userLogin
        })
            .populate('members owner')
            .then(projects => {
                res.status(200).json(projects)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static getProjectById(req, res) {
        Project.findOne({
            _id: req.params.id
        })
            .populate('members owner')
            .then(project => {
                if (project) {
                    res.status(200).json(project)
                } else {
                    res.status(404).json({
                        message: 'Project not found'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static updateProject(req, res) {
        Project.findOneAndUpdate({
            _id: req.params.id
        }, {
                name: req.body.name
            }, {
                new: true
            })
            .then(project => {
                if (project) {
                    res.status(200).json(project)
                } else {
                    res.status(404).json({
                        message: 'Project not found'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    

    static addProjectMember(req, res) {
        const _id = req.params.id
        console.log('masuk sini')
        Project
            .findOne({ _id })
            .then(project => {
                if (project) {
                    console.log(project, 'iniiii')
                    let isExist = project.members.indexOf(req.body.idMember) < 0
                    if (isExist) {
                        project.members.push(req.body.idMember)
                        return project.save()
                    } else {
                        res.status(400).json({ error: 'this email already join this project' })
                    }
                } else {
                    res.status(404).json({
                        message: 'Project not found'
                    })
                }
            })
            .then(success => {
                res.status(200).json(success)

            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static deleteProjectMember(req, res) {
        const _id = req.params.id
        Project
            .findOne({ _id })
            .then(project => {
                console.log('dimari')
                if (project) {
                    project.members = project.members.filter(el => el != req.body.idMember)
                    return project.save()
                } else {
                    res.status(404).json({
                        message: 'Project not found'
                    })
                }
            })
            .then(success => {
                res.status(200).json(success)
            })
            .catch(err => {
                res.status(500).json(err)
            })

    }

}


module.exports = controllerProject