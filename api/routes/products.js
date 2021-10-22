const express = require('express');

const router = express.Router();

router.get('/',(req, res, next)=> {
    res.status(200).json({message:'Handling get requests to /products route'});
})

router.post('/',(req, res, next)=> {
    res.status(200).json({message:'Handling post requests to /products route'});
})

module.exports = router;