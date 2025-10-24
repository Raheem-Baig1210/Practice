const schoolMdl = require("../model/school_admin")
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

module.exports = {
    loginSchool,
}