const express = require('express');
const router = express.Router();
const {authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser} = require('../controllers/userController')
const {protect, admin} = require('../middleware/authMiddleware')

//get users
router.route('/').get(protect, admin, getUsers)
//POST login
router.post('/login', authUser)
//GET protected route   Put protected route
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
//POST register user
router.post('/', registerUser)
//delete user
router.route('/:id').delete(protect, admin, deleteUser)
module.exports = router