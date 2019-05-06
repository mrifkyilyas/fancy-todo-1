const router = require('express').Router()
const {Task} = require('../controllers')
const authentification = require('../middleware/isAuthen')
const authorization = require('../middleware/isAuthor')

router.post('/',authentification,Task.create)
router.get('/',Task.getAllTask)
router.get('/project/:id',authentification,Task.getAllTaskByProject)
router.post('/project/:id',authentification,Task.createTaskProject)
router.get('/mytask',authentification,Task.getAllTaskByUser)
router.delete('/:id',authentification,authorization, Task.deleteTask)
router.delete('/project/:id',authentification,authorization, Task.deleteTask)
router.put('/project/:id',authentification,authorization,Task.updateTask)
router.put('/:id',authentification,authorization,Task.updateTask)








module.exports = router