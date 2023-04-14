const express = require('express');
const router = express.Router();
const {protect, admin} = require('../middleware/authMiddleware')
const {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered} = require('../controllers/orderController')


//POST login
router.route('/myorders').get(protect, getMyOrders)
router.post('/', protect, addOrderItems)
router.get('/', protect, admin, getOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)


module.exports = router