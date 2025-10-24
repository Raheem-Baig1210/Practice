// const admin = require("../model/admin");
const adminMdl = require("../model/admin")
const schoolMdl = require("../model/school_admin")
const teacherMdl = require("../model/teacher");
const studentMdl = require("../model/students")
// const { param } = require("../routes/admin_routes");
const {responseGenerator, hashpassword, comparepassword, generateTokens} = require("../utils/utils");
const { default: mongoose } = require("mongoose");
// const teacher = require("../model/teacher");



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


const updateSchool = async(req,res)=>{
    try {
        const schoolId=req.params.id;
        const updatedData=req.body

        const school= await schoolMdl.findByIdAndUpdate(schoolId,updatedData,{new: true})
        if(!school){
            return res.status(404).json({message: "School not found ...!!!"})
        }

        res.status(200).json({message: "School updated successfuly...!!!"})
    } catch (err) {
        console.log(err)
        let resp = responseGenerator(false, "Error while updating school...!!!");
        return res.status(404).json(resp)
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


const deleteSchool = async(req,res)=>{
    try {
        const {id}=req.params;
        const school=await schoolMdl.findByIdAndUpdate(id)
        if(!school){
            return res.status(500).json({message:"School not found"})
        }
        school.isActive=!school.isActive;
        await school.save()
        let resp=responseGenerator(true,"School's status changed successfully")
        return res.status(200).json(resp)
    } catch (error) {
        console.log(error)
        let resp=responseGenerator(false, "Error while deleting School...!!!!")
        return res.status(404).json(resp)
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
        // console.log(teachers)
        let resp = responseGenerator(true, "Here is the list of teachers...!!!",teachers)
        // console.log(teachers.phno, teachers.email)
        return res.status(200).json(resp)
    } catch (error) {
        let resp= responseGenerator(false,"Error while fetching the list of teachers...!!!",error.message)
        return res.status(404).json(resp)
    }
}


const updateTeacher = async(req,res)=>{
    try {
        const teacherId=req.params.id
        const updateData = req.body;

        const updatedTeacher= await teacherMdl.findByIdAndUpdate(teacherId,updateData,{new: true})
        if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.status(200).json({
      message: 'Teacher updated successfully'
    });
    } catch (err) {
        let resp = responseGenerator(false, "Error While updating the teacher...!!!",err)
        return res.status(404).json(resp)
    }
}


const deleteTeacher = async(req,res)=>{
    try {
        const {id}=req.params;
        const teacher=await teacherMdl.findByIdAndUpdate(id)
        if(!teacher){
            return res.status(500).json({message:"teacher not found"})
        }
        teacher.isActive=!teacher.isActive;
        await teacher.save()
        let resp=responseGenerator(true,"teacher's status changed successfully")
        return res.status(200).json(resp)
    } catch (error) {
        console.log(error)
        let resp=responseGenerator(false, "Error while deleting teacher...!!!!")
        return res.status(404).json(resp)
    }
}


const addNewStudent = async(req,res)=>{
    try {
        const data=req.body;
        const student=new studentMdl(data)
        
        const currentYear=new Date().getFullYear()
        const yearSuffix=currentYear.toString().slice(-2)
        
        const lastRollStudent = await studentMdl.findOne({rollNumber: {$regex:`^${yearSuffix}`}},{},{sort: {rollNumber: -1}})
        
        if(lastRollStudent && lastRollStudent.rollNumber){
            const lastCount = parseInt(lastRollStudent.rollNumber.slice(2));
            const nextCount = (lastCount+1).toString().padStart(3,"0")
            student.rollNumber=`${yearSuffix}${nextCount}`
        }else{
            student.rollNumber=`${yearSuffix}001`
        }
        
        
        await student.save()
        
        let resp = responseGenerator(true,"Student added Successfully ...!!!");
        return res.status(200).json(resp)
    } catch (error) {
        console.log(error);
        let resp = responseGenerator(false, "Error while adding a new Student...!!!")
        return res.status(404).json(resp)
    }
}


const listOfStudent = async(req,res)=>{
    try {
        const students= await studentMdl.find().lean()
        
        const resp = responseGenerator(true,"Here is the List of students ...!!!",students)
        
        return res.status(200).json(resp);
    } catch (error) {
        console.log(error);
        let resp = responseGenerator(false,"Error while fetching the list of students...!!!")
        return res.status(404).json(resp)
    }
}

const updateStudent = async(req,res)=>{
    try {
        const studentId = req.params.id
        const updatedData = req.body;
        
        const updatedStudent = await studentMdl.findByIdAndUpdate(studentId,updatedData,{new:true})
        if(!updatedStudent){
            return res.status(400).json({message: "Student not found...!!!"})
        }
        res.status(200).json({message:"Student Updated successfully...!!!"})
    } catch (err) {
        console.log(err)
        let resp = responseGenerator(false,"Error while updating the student information...!!!")
        return res.status(404).json(resp)
    }
}


const deleteStudent = async(req,res)=>{
    try {
        const {id}=req.params;
        const student = await studentMdl.findByIdAndUpdate(id,{ isActive: req.body.isActive },{new:true})
        if(!student){
            return res.status(400).json({message:"Student Not found...!!!"})
        }
        // student.isActive=!student.isActive
        await student.save()
        let resp = responseGenerator(true, "Student status changed...!!!")
        return res.status(200).json(resp)
    } catch (err) {
        console.log(err)
        let resp = responseGenerator(false,"Error while making student Active/inactive...!!!")
        return res.status(404).json(resp)
    }
}

// const searchTeachersBySchool = async(req,res)=>{
//     try {
        
//     } catch (err) {
//         console.log(err)
//         return res.status(404).json({message: "Error while fetching the teachers by school ID...!!!"})
//     }
// }


module.exports={
    registerAdmin,
    loginAdmin,
    listOfAdmins,
    addNewSchool,
    updateSchool,
    listOfSchools,
    addNewTeacher,
    listOfTeachers,
    updateTeacher,
    deleteSchool,
    deleteTeacher,
    addNewStudent,
    listOfStudent,
    updateStudent,
    deleteStudent
}