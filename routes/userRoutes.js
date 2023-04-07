const express = require('express');
const router = express.Router();
const {authUser, getUserProfile, registerUser} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

//POST login
router.post('/login', authUser)
//GET protected route
router.route('/profile').get(protect, getUserProfile)
//POST register user
router.post('/', registerUser)

module.exports = router