const express = require("express")
const router = express.Router()
const admin_routes =  require("./admin_routes")
const school_routes = require("./school_routes")
const admincntrl = require("../controller/admincntrl")
const middleware = require("../middleware/isLoggedIn")
const contrl  = require("../controller/cntrl")

// const jwt = require("jsonwebtoken");


router.get("/hello",contrl.hello)
// router.post("/registerAdmin", admincntrl.registerAdmin)
// router.post("/loginAdmin", admincntrl.loginAdmin)
// router.post("/listOfAdmins",middleware.isLoggedIn,admincntrl.listOfAdmins)
router.use("/admin",admin_routes)
router.use("/school",school_routes)

module.exports=router