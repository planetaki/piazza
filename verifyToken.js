//this file takes the token from the header and checks is the token is correct
const { send } = require('express/lib/response')
const jsonwebtoken = require('jsonwebtoken')

function auth(req,res,next){
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).send({message:'Access denied'})
    }
    try{
        const verified = jsonwebtoken.verify(token,process.env.TOKEN_SECRET)
        req.user=verified
        next()//next() is the key tp jump to the next middleware
    }catch(err){
        return res.status(401).send({message:'Invalid token'})
    }
}

module.exports=auth