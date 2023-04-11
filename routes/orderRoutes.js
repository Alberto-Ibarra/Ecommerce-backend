const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware')
const {addOrderItems, getOrderById, updateOrderToPaid} = require('../controllers/orderController')

//POST login
router.post('/', protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)


module.exports = router