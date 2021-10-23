const express = require('express');
const app = express();
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


app.use(express.json())


mongoose.connect("mongodb://localhost/node-shop-api").then(()=>{
    console.log("Connection established")
}).catch((e)=>{
    console.log("Connection Failed")
})



// app.use((req, res, next) => {
//     const error = new Error('Not Found')
//     error.status = 404
//     next(error)
// })

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Authorization'
    )
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET,DELETE,PATCH')
        return res.status(200).json({})
    }
    next()
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({ 
        error:{
            message: error.message
        }
    })
})
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
module.exports = app;