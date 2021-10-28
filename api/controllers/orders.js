const Order = require('../models/order')
const Product = require('../models/product')

exports.order_get_all = (req, res) =>  {
    Order.find()
    .select('product quantity _id')
    .populate('product','name')
    .then((docs) =>{
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc =>{
                return {
                    product: doc.product,
                    quantity: doc.quantity,
                    _id: doc._id,
                    request:{
                        type: 'GET', 
                        url: 'http://localhost:3000/orders/'+ doc._id,
                    }
                }
            })
        })
    })
    .catch((err) =>{
        res.status(404).json({ error: err})
    })
}

exports.order_get_one = (req, res) =>{
    const orderId = req.params.orderId
    Order.findOne({_id:orderId})
    .select('product quantity _id')
    .populate({path:'product',select:'name _id'})
    .then((order) =>{
        if(!order){
            return res.status(404).json({message:"Order not found"})
        }
        return res.status(200).json(
             order,
        )
    }).catch((err) =>{
        res.status(404).json({ error: err})
    })
}

exports.order_post_toCreateOrder = (req, res) => {
    //Search for existing product in Product table
    Product.findById(req.body.productId)
    .then(product => {
        //If the product not found in Product table
        if(!product){
            return res.status(404).json({
                message: 'Product not found'
            })
        }
        //Extracting order body information
        const order = new Order({
            quantity: req.body.quantity,
            product: req.body.productId
        })
        //saving the order into the Order table
        return order.save()
    })
    //If order saved successfully then execute this block
    .then((result) => {
        res.status(201).json({
            message: "Order stored successfully",
            createdProduct:{
                _id: result._id,
                product: result.product,
                quantity: result.quantity,
            },
            result:{
                type: "GET",
                url: 'http://localhost:3000/orders/' + result._id,
            }
        })
    })

    //Failed to store order into Order table due to server error
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
    
}

exports.order_delete = (req, res) => {
    const orderId = req.params.orderId
    Order.remove(orderId)
    .then((result) =>{
        res.status(200).json({
            message: "Order deleted successfully",
            result:{
                type: "POST",
                url: 'http://localhost:3000/orders/',
                body:{
                    product: "Product Id",
                    quantity: "Number",
                }
            }
        })
    })
    .catch((error) => {
        message: "Error deleting order"
    })
}