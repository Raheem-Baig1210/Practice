const schoolMdl = require("../model/school_admin")
const studentMdl = require("../model/students")
const teacherMdl = require("../model/teacher")
const {responseGenerator, hashpassword, comparepassword, generateTokens} = require("../utils/utils")

const loginSchool = async(req,res)=>{
    try {
        const {email,password} = req.body
        const school = await schoolMdl.findOne({email}).lean()
        if(!school){
            return res.status(400).json({message: "School Not found...!!!"})
        }
        // console.log(school)
        // console.log(password, school.password)
        const isMatch = await comparepassword(password, school.password)
        if(!isMatch){
            let resp = responseGenerator(false, "Invalid credentials...!!!")
            return res.status(400).json(resp)
        }
        const tokens = generateTokens({email, name:school.name, id: school.id})
        let resp = responseGenerator(true, "School Logged in Successfully...!!!",{id:school._id, tokens})
        return res.status(200).json(resp)
    } catch (err) {
        console.log(err)
        return res.status(404).json({message: "Error while loggin in of School...!!!"})
    }
}


const studentsAtSchool = async (req,res) => {
    try {
        const {schoolId} = req.params
        const school = await schoolMdl.findById(schoolId)
        if(!school){
            return res.status(400).json({message:"School Not found...!!!"})
        }
        const students = await studentMdl.find({schoolId}).populate("schoolId", "name email location")
        if(students.length==0){
            return res.status(200).json({message:"No Student Found at this school ...!!!", students:[]})
        }
        // console.log(students)
        return res.status(200).json({count: students.length, students})
    } catch (err) {
        console.log(err)
        return res.status(404).json({message:"Error while fetching the students of this school...!!!"})
    }
}

const teachersAtSchool = async (req,res) => {
    try {
        const {schoolId} = req.params
        const school = await schoolMdl.findById(schoolId)
        if(!school){
            return res.status(400).json({message:"School not found...!!!"})
        }
        const teachers = await teacherMdl.find({schoolId}).populate({path: "schoolId", select: "name email location" ,model: "school"})
        if(teachers.length==0){
            return res.status(200).json({message: "No teacher is assigned yet...!!!"})
        }
        // console.log(teachers)
        return res.status(200).json({count: teachers.length, teachers})
    } catch (err) {
        console.log("Error while fetching the teachers list...!!!",err)
        return res.status(404).json({message:"Errors in teachersAtSchool...!!!"})
    }
}


const updateStudent = async(req,res)=>{
    try {
        const studentId = req.params.id
        const updatedData = req.body

        const updatedStudent = await studentMdl.findByIdAndUpdate(studentId,updatedData,{new: true})
        if(!updatedStudent){
            return res.status(400).json({message:"Student not found...!!!"})
        }
        // console.log("Updated...!!!", updatedStudent)
        return res.status(200).json({message:"Student Updated Successfully...!!!"})
    } catch (err) {
        console.log("Error while updating the student information...!!!",err)
        return res.status(404).json({message:"Error...!!!"})
    }
}

const addNewStudent = async (req,res) => {
    try {
        const data = req.body
        const student = new studentMdl(data)

        const currentYear = new Date().getFullYear()
        const yearSuffix = currentYear.toString().slice(-2)

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
    } catch (err) {
        console.log("Error while adding a new student...!!!",err)
        return res.status(404).json({message:"Error...!!!"})
    }
}



module.exports = {
    loginSchool,
    studentsAtSchool,
    addNewStudent,
    updateStudent,
    teachersAtSchool
}