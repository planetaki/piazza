
const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    post_Title:{
        type:String
    },
    post_Topic:{
        type:String
    },
    post_Text:{
        type:String
    },
    post_Time:{
        type:String
    }
})
//export our schema
module.exports = mongoose.model('posts',postSchema)