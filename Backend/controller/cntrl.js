const express = require("express")
const adminMdl = require("../model/admin")
const {responseGenerator, hashpassword, comparepassword, generateTokens} = require("../utils/utils")

const hello = (req,res)=>{
    res.send("Hello Dubai...!!!")
}

const registerAdmin = async(req,res)=>{
    try{
        const data = req.body;
        const {email}=data
        const existingAdmin = await adminMdl.findOne({ email})
        if(existingAdmin){
            let resp = responseGenerator(false, "Admin already exists...!!!")
            return res.send(400).json(resp);
        }
        const admin= new adminMdl(data)
        await hashpassword(data.password)
        await admin.save()
        let resp = responseGenerator(true, "Admin registered successfully...!!!", admin.id)
        res.status(201).json(resp)

    }
    catch(err){
        res.status(500).json({message:"Error while registering admin...!!!",error:err.message})
    }
}


module.exports={hello, registerAdmin}