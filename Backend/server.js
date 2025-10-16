const express = require('express')
const mongoose =require("mongoose")
const cors = require("cors");
require("dotenv").config()

const routes = require("./routes/routes.js")

const app = express()

app.use(cors());
app.use(express.json())

app.use("/",routes)




mongoose.connect(process.env.DB_URL).then(()=> console.log("DB is connected successfully...!!!")).catch((err)=>console.log("Error while connecting DB...!!!",err))

app.listen(3000,()=> console.log("Server Started successfully...!!!!"))