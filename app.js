const express = require('express')
const app = express()

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

app.use(bodyParser.json())


//we create our routes
const postsRoute = require('./routes/posts')
const authRoute = require('./routes/auth')

app.use('/api/posts',postsRoute)
app.use('/api/user',authRoute)


//connect to our database with dotenv file
mongoose.connect(process.env.DB_CONNECTOR).then(()=>{
    console.log('Your mongoDB connector is on...')
})

app.listen(3000, ()=>{
    console.log('Server is running')
})