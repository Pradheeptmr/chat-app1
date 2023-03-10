const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const colors = require('colors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const errorHandler = require('./middlewares/errorMiddleware')
const authRoutes = require("./routes/authRoutes");



dotenv.config()
connectDB();

const app=express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use(errorHandler)

const PORT = process.env.PORT || 8080;

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/openai", require("./routes/openaiRoutes"));

app.listen(8080,()=>{
    console.log(`Server Running in ${process.env.DEV_MODE} on ${PORT}`.bgCyan.white);
});