const express = require("express")
const router = express.Router()
const admincntrl = require("../controller/admincntrl")
const middleware = require("../middleware/isLoggedIn")

router.post("/registerAdmin", admincntrl.registerAdmin)
router.post("/loginAdmin", admincntrl.loginAdmin)
router.get("/listOfAdmins",middleware.isLoggedIn,admincntrl.listOfAdmins)
router.post("/addNewSchool",middleware.isLoggedIn,admincntrl.addNewSchool)
// router.put("/updateSchool",middleware.isLoggedIn,admincntrl.updateSchool)
router.put("/updateSchool/:id",admincntrl.updateSchool)
router.get("/listOfSchools",middleware.isLoggedIn,admincntrl.listOfSchools)
router.post("/addNewTeacher",middleware.isLoggedIn,admincntrl.addNewTeacher)
router.get("/listOfTeachers",middleware.isLoggedIn,admincntrl.listOfTeachers)
router.put("/updateTeacher/:id",middleware.isLoggedIn,admincntrl.updateTeacher)
// router.put("/updateTeacher/:id",admincntrl.updateTeacher)

module.exports=router