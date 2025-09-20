const express = require("express")
const router = express.Router()
const contrl = require("../controller/cntrl")
const admincntrl = require("../controller/admincntrl")
const middleware = require("../middleware/isLoggedIn")

// const jwt = require("jsonwebtoken");


router.get("/hello",contrl.hello)
router.post("/registerAdmin", admincntrl.registerAdmin)
router.post("/loginAdmin", admincntrl.loginAdmin)
router.post("/listOfAdmins",middleware.isLoggedIn,admincntrl.listOfAdmins)

module.exports=router