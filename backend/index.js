const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const cookeieParser = require("cookie-parser")
const mongoose = require("mongoose")
const app = express()
require("dotenv").config()

const port = process.env.PORT || 5000;


const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
    ],
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookeieParser())


const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB Conntect Successfully");
    }
    catch(err){
        console.log("Mongoose connection error", err);
    }
}
connectDB()

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Server" })
})

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})
