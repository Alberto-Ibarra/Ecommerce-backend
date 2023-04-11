const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware')
import addOrderItems from '../controllers/orderController';

//POST login
router.post('/').post(protect, addOrderItems)


module.exports = router