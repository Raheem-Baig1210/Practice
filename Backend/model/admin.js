const mongoose = require("mongoose")

const schema = mongoose.Schema

const adminSchema = new schema(
    {
        name: {type: String, required: true},
        email: {type: String, required:true, unique: true},
        phno: {type: Number, required: true},
        password: {type: String, required: true},
        isActive: { type: Boolean, default: true }
    },
    {timeStamps: true}
)

module.exports = mongoose.model("admin",adminSchema)