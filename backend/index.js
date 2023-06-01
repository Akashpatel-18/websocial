const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

//importing Routes
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/users')
const { isAuthenticated } = require('./middleware/auth')

//config
require('dotenv').config()
mongoose.set('strictQuery', false);

//connnect to database
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB Connected"))
.catch((err) => console.log(err.message))

//middlewares
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cookieParser())
app.use(cors({origin: process.env.FRONTEND_URL}))

//use Routes
app.use('/posts', postRoutes)
app.use('/users', userRoutes)

app.get('/some',isAuthenticated, (req,res) => {
    res.json(req.user)
})

//listen to the server
app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`)
})