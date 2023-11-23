const { tokenMiddleware } = require('../middleware/token')

const Router = require('express')
const OrderController = require('../controller/order.controller')
const router = new Router()

router.post('/order/create', tokenMiddleware, OrderController.create)
router.get('/order/getByUserId', tokenMiddleware, OrderController.getByUserId)
router.get('/order/getAllOrder', OrderController.getAllOrder)
router.post('/order/delete', tokenMiddleware, OrderController.delete)
router.post('/order/complete', OrderController.complete)
router.post('/order/cancellation', OrderController.cancellation)

module.exports = router
