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
        countInStock: 0,
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


//create new review PUT /api/products/:id/reviews
const createProductReview = asyncHandler(async (req, res) => {
    const {rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if(product){
        const alreadyReviewed = product.reviews.find(r=>r.user.toString() === req.user._id.toString())

        if(alreadyReviewed){
            res.status(400).send({message: 'product already reviewed'})
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length
        console.log(product);
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(201).json({message: 'review created'})
    }else{
        res.status(404).send({message: 'product not found'})
    }


})

module.exports = {getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview}