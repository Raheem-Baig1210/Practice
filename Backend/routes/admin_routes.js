const express = require("express")
const router = express.Router()
const admincntrl = require("../controller/admincntrl")
const middleware = require("../middleware/isLoggedIn")

router.post("/registerAdmin", admincntrl.registerAdmin)
router.post("/loginAdmin", admincntrl.loginAdmin)
router.get("/listOfAdmins",middleware.isLoggedIn,admincntrl.listOfAdmins)
router.post("/addNewSchool",middleware.isLoggedIn,admincntrl.addNewSchool)
router.get("/listOfSchools",middleware.isLoggedIn,admincntrl.listOfSchools)
router.post("/addNewTeacher",middleware.isLoggedIn,admincntrl.addNewTeacher)
router.get("/listOfTeachers",middleware.isLoggedIn,admincntrl.listOfTeachers)

module.exports=router