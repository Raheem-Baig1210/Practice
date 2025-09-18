const express = require('express')
const mongoose =require("mongoose")
require("dotenv").config()

const routes = require("./routes/routes.js")

const app = express()

app.listen(3000,()=> console.log("Server Started successfully...!!!!"))

app.use(express.json())

app.use("/hit",routes)

mongoose.connect(process.env.DB_URL).then(()=> console.log("DB is connected successfully...!!!")).catch((err)=>console.log("Error while connecting DB...!!!",err))
