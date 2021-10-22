const express = require('express');
const app = express();
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


mongoose.connect(
    'mongodb+srv://node-shop:'+
    process.env.MONGO_ATLAS_PW+
    '@node-rest-shop.suw8p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useMongoClient: true
    }
)


app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))

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