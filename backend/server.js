const express = require("express");
const dotenv = require("dotenv");

const { application } = require("express");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes')



const app = express()
dotenv.config()
connectDB()
app.use(express.json())   // to accept json data


app.use('/api/user', userRoutes)



// app.get('/', (req, res) => {
//   res.send('API is running')
// })

// app.get('/api/chat', (req, res) => {
//   res.send(chats)
// })


const PORT = process.env.PORT

app.listen(PORT, console.log('server started at port 5000'))