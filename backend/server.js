const express = require("express");
const dotenv = require("dotenv");

const { application } = require("express");

const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const chatsRoutes = require('./routes/chatRoutes');
const { notFound, errorHandler } = require("./middleware/errorMiddleware");



const app = express()
dotenv.config()
connectDB()
app.use(express.json())   // to accept json data


app.use('/api/user', userRoutes)
app.use('/api/chat', chatsRoutes)


// Error Handling
app.use(notFound);
app.use(errorHandler);




const PORT = process.env.PORT

app.listen(PORT, console.log('server started at port 5000'))