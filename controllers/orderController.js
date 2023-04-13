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

//get order by id  GET /api/orders/:id

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order){
        res.json(order)
    }else{
        res.status(404).send({message: 'order not found'})
    }
})


//update order to paid  GET /api/orders/:id/pay

const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult={
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()
        console.log(updatedOrder);
        res.json(updatedOrder)
    }else{
        res.status(404).send({message: 'order not found'})
    }
})


//get logged in user order  GET /api/orders/myorders

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id})
    console.log(orders);
    res.json(orders)

})

//get all orders GET /api/orders/
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user', 'id name')
    res.json(orders)

})

module.exports = {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders}