require("dotenv").config()
const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const mongoose = require("mongoose")

const app = express()
const PORT = process.env.PORT || 3461
connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))
app.use("/api/tasks", require('./routes/taskRoute'))
app.use("/api/posts", require('./routes/postRoute'))
app.use("/api/users", require('./routes/userRoute'))
app.use("/api/photos", require('./routes/photoRoute'))

mongoose.connection.once('open',()=>{
    console.log("connected to mongoDB")
    app.listen(PORT, ()=>{
        console.log(`server running on ${PORT}`)
    })
})

mongoose.connection.on("error", err=>{
    console.log(err);
})

 