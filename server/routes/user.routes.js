const { tokenMiddleware } = require('../middleware/token');

const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')

router.post('/user/login', userController.login)
router.post('/user/registration', userController.registration)
router.get('/user/isUser', tokenMiddleware, userController.isUser)
router.get('/user/logout', userController.logout)

module.exports = router
