const router = require('express').Router()
const {Project} = require('../controllers')
const authentification = require('../middleware/isAuthen')
const authorizationProject = require('../middleware/isAuthorProject')



router.post('/',authentification,Project.createProject)
router.get('/',authentification,Project.getAllProject)
router.get('/:id',authentification,Project.getProjectById)
router.delete('/:id',authentification,authorizationProject,Project.deleteProject)
router.patch('/:id',authentification,authorizationProject,Project.updateProject)
router.post('/addmember/:id',authentification,authorizationProject,Project.addProjectMember)
router.delete('/deletemember/:id',authentification,authorizationProject,Project.deleteProjectMember)









module.exports = router