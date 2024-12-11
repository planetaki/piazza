const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const verifyToken = require('../verifyToken')

router.get('/', verifyToken, async(req,res) =>{
    try{
        const posts = await Post.find()
        res.send(posts)
    }catch(err){
        res.status(400).send({message:err})
    }
})


// POST (Create data)
router.post('/',async(req,res)=>{
    //console.log(req.body)

    const postData = new Post({
        post_Title:req.body.post_Title,
        post_Topic:req.body.post_Topic,
        post_Text:req.body.post_Text,
        post_Time:req.body.post_Time
    })
    // try to insert...
    try{
        const postToSave = await postData.save()
        res.send(postToSave)
    }catch(err){
        res.send({message:err})
    }
})

module.exports = router