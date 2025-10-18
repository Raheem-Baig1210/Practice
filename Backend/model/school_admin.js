const mongoose = require("mongoose")

const schema = mongoose .Schema

const schoolAdminSchema = new schema(
    {
        name: {type: String, required: true},
        estyear:{type: Number,required: true},
        email: {type: String, required: true, unique: true},
        phno: {type: Number, required: true, unique: true},
        location:{type: String, required: true},
        password: {type: String, required: true},
        isActive: { type: Boolean, default: true }
    },
    {timestamps: true}
)

module.exports=mongoose.model("school",schoolAdminSchema)