const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');


const protect = asyncHandler( async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')
            // console.log(req.user);

            next()
        } catch (error) {
            console.error(error);
            res.status(401).send({message: 'Token failed'})
        }
    }

    if(!token){
        res.status(401).send({message: 'no authorization, no token'})

    }
})

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401).send({message: 'not authorize as a admin'})
    }
}

module.exports = {protect, admin}