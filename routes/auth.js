const express = require('express')
const router = express.Router()




const User = require('../models/User')
const {registerValidation,loginValidation} = require('../validations/validation')

const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')


//REGISTER
router.post('/register', async(req,res)=>{

     //validation 1 to check user input against our requirme nts
     const {error} = registerValidation(req.body)
     if (error) {

         return res.status(400).send({message:error['details'][0]['message']})
    }


     //VALIDATION 2 to check if user already exists
     const userExists = await User.findOne({email:req.body.email})
        if(userExists){
        return res.status(400).send({message:'User already exists'})
    }


    //hashed representation of the password
    const salt = await bcryptjs.genSalt(5)
    const hashedPassword = await bcryptjs.hash(req.body.password,salt)





    // Code to insert data, this code will save our data
    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
    })

    try{
        const savedUser = await user.save()
        res.send(savedUser)
    }catch(err){
        res.status(400).send({message:err})
    }
    
})


//LOGIN

router.post('/login', async(req,res) =>{

    //validation 1 to check user input against our requirme nts
    const {error} = loginValidation(req.body)
    if (error) {

        return res.status(400).send({message:error['details'][0]['message']})
   }

//VALIDATION 2 to check is user password is correct and is user exists

const user = await User.findOne({email:req.body.email})
if(!user){
    return res.status(400).send({message:'User does not exist'})
} 

// Validation 3 to check user password
const passwordValidation = await bcryptjs.compare(req.body.password,user.password)
if(!passwordValidation){
    return res.status(400).send({message:'Password is wrong'})

}


// Generate an auth-token
const token = jsonwebtoken.sign({_id:user._id}, process.env.TOKEN_SECRET)
res.header('auth-token',token).send({'auth-token':token})






})

 









 module.exports=router 