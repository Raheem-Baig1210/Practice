const express = require("express")
const router = express.Router()
const contrl = require("../controller/cntrl")

router.get("/",contrl.hello)
router.post("/registerAdmin", contrl.registerAdmin)

module.exports=router