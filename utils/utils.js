const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const responseGenerator = (success, message, data)=>{
    let obj={}
    obj.success=success;
    obj.message=message|| (success ? "Success": "Failed")
    if(data){
        obj.data=data;
    }
    return obj;
}

const hashpassword = (plainpassword)=>{
    return bcrypt.hash(plainpassword,10)
}

const comparepassword = (plainpassword, hashpassword)=>{
    return bcrypt.compare(plainpassword, hashpassword)
}

const generateTokens = (data) =>{
    return jwt.sign(data, process.env.SECRET_KEY, {expiresIn: "1d"})
}

module.exports = {
    responseGenerator,
    hashpassword,
    comparepassword,
    generateTokens
}