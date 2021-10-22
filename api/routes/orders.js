const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({ message:'Order Fetched'})
})

router.post('/', (req, res) => {
    res.status(201).json({ message:'Order Created'})
})

router.get('/:orderId', (req, res) => {
    orderId = req.params.orderId
    res.status(200).json({ 
        message:'Order Details',
        orderId: orderId
    })
})
router.delete('/:orderId', (req, res) => {
    res.status(200).json({ message:'Order Deleted'})
})


module.exports = router