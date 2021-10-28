const express = require('express')
const router = express.Router()
const Order = require('../models/order')
const checkAuth = require('../middleware/check-auth')
const orderController = require('../controllers/orders')

//Getting all orders
router.get('/', checkAuth,orderController.order_get_all)

//Getting single order info
router.get('/:orderId', checkAuth, orderController.order_get_one)

//Creating new Orders
router.post('/',checkAuth, orderController.order_post_toCreateOrder)

//deleting order
router.delete('/:orderId',checkAuth, orderController.order_delete)

module.exports = router