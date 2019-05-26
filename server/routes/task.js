const router = require('express').Router()
const {Task} = require('../controllers')
const authentification = require('../middleware/isAuthen')
const authorization = require('../middleware/isAuthor')
const authorzProject = require('../middleware/isauthorizProjectTask')

router.post('/',authentification,Task.create)
router.get('/',Task.getAllTask)
router.get('/project/:id',authentification,Task.getAllTaskByProject)
router.get('/mytask',authentification,Task.getAllTaskByUser)
router.delete('/:id',authentification,authorization, Task.deleteTask)
router.put('/:id',authentification,authorization,Task.updateTask)
router.put('/status/:id',authentification,authorization,Task.updateStatus)
router.post('/project/:id',authentification,authorzProject,Task.createTaskProject)
router.delete('/project/:id',authentification,authorzProject,Task.deleteTask)
router.put('/project/:id',authentification,authorzProject,Task.updateTask)
router.put('/project/status/:id',authentification,authorzProject ,Task.updateStatus)








module.exports = router