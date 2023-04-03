const express = require('express');
const products = require('./data/products')
const app = express();

const port = 5000;

app.get('/', (req,res)=>{
    res.send('api is running')
});

app.get('/api/products', (req,res)=>{
    res.json(products)
});

app.get('/api/products/:id', (req,res)=>{
    const product = products.find((p) => p._id === req.params.id) 
    res.json(product)
    console.log(product);
});

app.listen(port, console.log(`server running on port ${port}`))
