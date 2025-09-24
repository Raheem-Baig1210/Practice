const admin = require("../model/admin");
const adminMdl = require("../model/admin")
const schoolMdl = require("../model/school_admin")
const teacherMdl = require("../model/teacher")
const {responseGenerator, hashpassword, comparepassword, generateTokens} = require("../utils/utils")



const registerAdmin = async(req,res)=>{
    try{
        const data = req.body;
        const {email}=data
        const existingAdmin = await adminMdl.findOne({ email})
        if(existingAdmin){
            let resp = responseGenerator(false, "Admin already exists...!!!");
            return res.status(400).json(resp);
        }
        data.password = await hashpassword(data.password)
        const admin= new adminMdl(data)
        await admin.save()
        let resp = responseGenerator(true, "Admin registered successfully...!!!", admin.id)
        return res.status(201).json(resp)
        
    }
    catch(err){
        res.status(500).json({message:"Error while registering admin...!!!",error:err.message})
    }
}


const loginAdmin = async(req,res)=>{
    try{
        const {email,password} = req.body
        const admin = await adminMdl.findOne({email}).lean()
        if(!admin){
            let resp = responseGenerator(false, "Admin not found...!!!")
            return res.send(404).json(resp)
        }
        const isMatch = await comparepassword(password, admin.password)
        if(!isMatch){
            let resp = responseGenerator(false , "Invalid credentials...!!!");
            return res.status(401).json(resp)
        }
        const tokens = generateTokens({email, name:admin.name, id:admin.id})
        let resp = responseGenerator(true, "Admin Loggeed in successfully..!!!",{id:admin.id, tokens})
        return res.status(200).json(resp)
    }catch(err){
        let resp = responseGenerator(false, "Error while logging in...!!!", err.message)
        return res.status(500).json(resp)
    }
}


const listOfAdmins = async(req,res)=>{
    try{
        const admins = await adminMdl.find().select("-password").lean()
        let resp = responseGenerator(true, "Admins fetched successfully...!!!", admins)
        return res.status(200).json(resp)
    }catch(err){
        let resp = responseGenerator(false, "Error while fetching admins...!!!", err.message)
        return res.status(500).json(resp)
    }
}

const addNewSchool = async(req,res) =>{
    try{
        const data = req.body
        const {email,password}= data
        const existingSchool = await schoolMdl.findOne({email})
        if(existingSchool){
            let resp = responseGenerator(false, "School already exists...!!!");
            return res.status(400).json(resp)
        }
        data.password = await hashpassword(password)
        const school = new schoolMdl(data)
        await school.save()
        let resp = responseGenerator(true,"New school added successfully..!!!",school.id)
        return res.status(201).json(resp)
    }catch(err){
        let resp = responseGenerator(false, "Error while adding new school...!!!", err.message)
        return res.status(500).json(resp)
    }
}

const listOfSchools = async(req,res)=>{
    try {
        const schools = await schoolMdl.find().select("-password").lean()
        let resp = responseGenerator(true, "Here is the list of schools...!!!",schools)
        return res.status(200).json(resp)
    } catch (err) {
        let resp = responseGenerator(false, "Error while fetching of list of school...!!!",err.message)
        return res.status(500).json(resp)
    }
}

const  addNewTeacher = async(req,res)=>{
    try {
        const data = req.body
        const {email,password,phno}= data
        const existingTeacher = await teacherMdl.findOne({email,phno})
        if(existingTeacher){
            let resp = responseGenerator(false,"Teacher already exist with the same email or phone number...!!!")
            return res.status(200).json(resp)
        }
        data.password=await hashpassword(password)
        const teacher = new teacherMdl(data)
        await teacher.save()
        let resp=responseGenerator(true,"Teacher added successfully...!!!",teacher.id)
        return res.status(200).json(resp)
    } catch (error) {
        let resp = responseGenerator(false, "Error while adding new teacher ...!!!",error.message)
        return res.status(404).json(resp)
    }
}

const listOfTeachers = async(req,res)=>{
    try {
        const teachers = await teacherMdl.find().select("-password").lean()
        let resp = responseGenerator(true, "Here is the list of teachers...!!!",teachers)
        console.log(teachers.phno, teachers.email)
        return res.status(200).json(resp)
    } catch (error) {
        let resp= responseGenerator(false,"Error while fetching the list of teachers...!!!",error.message)
        return res.status(404).json(resp)
    }
}

module.exports={
    registerAdmin,
    loginAdmin,
    listOfAdmins,
    addNewSchool,
    listOfSchools,
    addNewTeacher,
    listOfTeachers
}