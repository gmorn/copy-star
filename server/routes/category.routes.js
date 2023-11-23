const Router = require('express')

const CategoryController = require('../controller/category.controller')
const router = new Router()

router.get('/category/getAllCategory', CategoryController.getAllCategory)

module.exports = router
