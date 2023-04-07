const express = require('express');
const router = express.Router();
const {authUser, getUserProfile} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

//POST
router.post('/login', authUser)
//GET
router.route('/profile').get(protect, getUserProfile)


module.exports = router