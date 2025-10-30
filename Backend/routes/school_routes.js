const express = require("express")
const router = express.Router()
const school_cntrl = require("../controller/schoolCntrl")
const admin_cntrl = require("../controller/admincntrl")
const middleware  = require("../middleware/isLoggedIn")

router.post("/loginSchool",school_cntrl.loginSchool)
router.get("/studentsAtSchool/:schoolId", school_cntrl.studentsAtSchool)
router.put("/updateStudent/:id",middleware.isLoggedIn,school_cntrl.updateStudent)
router.post("/addNewStudent",middleware.isLoggedIn,school_cntrl.addNewStudent)
router.put("/isActiveStudent/:id", middleware.isLoggedIn,admin_cntrl.deleteStudent)
router.get("/teachersAtSchool/:schoolId",school_cntrl.teachersAtSchool)

module.exports=router