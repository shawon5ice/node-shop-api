const express = require('express');

const router = express.Router();

router.get('/',(req, res, next)=> {
    res.status(200).json({message:'Handling get requests to /products route'});
})

router.post('/',(req, res, next)=> {
    res.status(201).json({message:'Handling post requests to /products route'});
})

router.get('/:productId',(req, res, next)=> {
    const id = req.params.productId
    if(id ==='special'){
        res.status(200).json({
            message:'You discovered the special product',
            id:id,
        })
    }else{
        res.status(200).json({
            message:'You entered an ID',
            id:id,
        })
    }
})

router.patch('/:productId',(req, res, next)=> {
    const id = req.params.productId
    res.status(200).json({
        message:'Product updated'
    })
})

router.delete('/:productId',(req, res, next)=> {
    const id = req.params.productId
    res.status(200).json({
        message:'Product Deleted'
    })
})
module.exports = router;