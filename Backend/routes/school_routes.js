const express = require("express")
const router = express.Router()
const school_cntrl = require("../controller/schoolCntrl")
const middleware  = require("../middleware/isLoggedIn")

router.post("/loginSchool",school_cntrl.loginSchool)

module.exports=router