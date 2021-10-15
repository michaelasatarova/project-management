const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController');
const projectController = require('./controllers/projectController')

//login logout register
router.get('/', userController.home)
router.post('/register', userController.register)
router.post('/login',  userController.login)
router.post('/logout',  userController.logout)

// project related routs
router.post('/create-project', projectController.createProject)
router.get('/project/:id/edit', projectController.viewEditScreen)
router.post('/project/:id/edit', projectController.edit)
router.post('/project/:id/delete',  projectController.delete)


module.exports = router