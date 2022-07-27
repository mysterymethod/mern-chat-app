const express = require("express");
const dotenv = require("dotenv");

const { application } = require("express");
const { chats } = require("./data/data");
const connectDB = require("./config/db");



const app = express()
dotenv.config()
connectDB()



app.use('/api/user', userRoutes)



// app.get('/', (req, res) => {
//   res.send('API is running')
// })

// app.get('/api/chat', (req, res) => {
//   res.send(chats)
// })


const PORT = process.env.PORT

app.listen(PORT, console.log('server started at port 5000'))