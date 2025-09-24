const mongoose = require("mongoose")
const schema= mongoose.Schema

const teacherSchema = new schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        phno: {type: Number, required: true, unique: true},
        password: {type: String, required: true},
        subject:{type: String, required: true},
        qualification:{type: String, required: true},
        experience:{type: Number, required: true},
        schoolId: {type: mongoose.Schema.Types.ObjectId, ref: "school_admin", required: true}
    },
    {timestamps: true}
)

module.exports=mongoose.model("teacher",teacherSchema)