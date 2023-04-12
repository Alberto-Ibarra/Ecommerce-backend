const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')



dotenv.config()
connectDB()

const app = express();
app.use(express.json())
app.use(cors({
    exposedHeaders: ['Authorization'],
    origin: '*'
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

const port = process.env.PORT || 5000;



app.get('/', (req,res)=>{
    res.send('api is running')
});


app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.get('/api/config/paypal', (req,res) => res.send(process.env.PAYPAL_CLIENT_ID))


app.listen(port, console.log(`server running in ${process.env.NODE_ENV} on port ${port}`))
