const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.user_signup = (req, res) => {
    User.find({ email: req.body.email })
    .then(user =>{
        console.log(user)
        if(user.length>0){
            return res.status(409).json({ 
                message: 'Email already exists'
            })
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({error: err})
                }else{
                    const user = new User({
                        email: req.body.email,
                        password: hash,
                    })
                    user.save()
                    .then((result) => {
                        console.log(result)
                        res.status(201).json({
                            message: 'User created successfully'
                        })
                    })
                    .catch(err =>{
                        console.log(err)
                        res.status(500).json({
                            error: err
                        })
                    })
                }
            })
        }
    })
    
}

exports.user_login = (req, res)=>{
    User.find({email: req.body.email})
    .then(user=>{
        if(user.length <1){
            return res.status(401).json({message:"Authentication failed"})
        }
        bcrypt.compare(req.body.password, user[0].password,(err, result)=>{
            if(err){
                return res.status(401).json({
                    message: 'Invalid password'
                })
            }
            if(result){
                const token = jwt.sign(
                    {
                        email: user[0].email,
                        userId: user[0]._id,
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                )
                return res.status(200).json({
                    message: 'Auth successfully',
                    token:token,
                })
            }else{
                return res.status(401).json({
                    message: 'Authentication password'
                })
            }
        })
    })
    .catch(err =>{
        return res.status(500).json({error: err})
    })
}

exports.user_deletaion = (req, res)=>{
    User.deleteOne({_id: req.params.userId})
    .then(result =>{
        return res.status(200).json({
            message: 'User deleted successfully'
        })
    })
    .catch(err =>{
        return res.status(500).json({error: err})
    })
}