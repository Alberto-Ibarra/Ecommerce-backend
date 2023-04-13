const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')

//fetch all products   GET /api/products
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})


//fetch single product  GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        res.status(404).json({message: 'Product not found'})
    }
    
})


const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        await product.remove()
        res.json({message: 'product removed'})
    }else{
        res.status(404).json({message: 'Product not found'})
    }
    
})

//create product  POST/api/products
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample Product',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'sample category',
        cointInStock: 0,
        numReviews: 0,
        description: 'sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

//update product PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
    const {name, price, description, brand, category, countInStock, image } = req.body

    const product = await Product.findById(req.params.id)

    if(product){
        product.name = name
        product.price = price
        product.description = description
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        product.image = image


        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }else{
        res.status(404).send({message: 'product not found'})
    }


})

module.exports = {getProducts, getProductById, deleteProduct, createProduct, updateProduct}