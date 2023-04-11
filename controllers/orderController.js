const Order = require('../models/orderModel')
const asyncHandler = require('express-async-handler')

//create new order   POST /api/orders
const addOrderItems = asyncHandler(async (req, res) => {
    const {orderItems, shippingAddress, payment, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body

    if(orderItems && orderItems.length === 0){
        res.status(400).json({message: 'No order items'})
        return
    }else{
        const order = new Order({
            orderItems, 
            user: req.user._id, 
            shippingAddress, 
            payment, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

module.exports = addOrderItems