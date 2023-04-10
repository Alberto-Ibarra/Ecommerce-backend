const express = require('express');
const router = express.Router();
const {authUser, getUserProfile, registerUser, updateUserProfile} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

//POST login
router.post('/login', authUser)
//GET protected route   Put protected route
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
//POST register user
router.post('/', registerUser)

module.exports = router