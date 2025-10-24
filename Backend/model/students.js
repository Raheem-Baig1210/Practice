const mongoose=require("mongoose")
const schema=mongoose.Schema

const studentSchema = new schema(
    {
        name: {type: String, required: true},
        rollNumber: {type: String, required: true, unique: true},
        dateOfBith: {type: Date},
        gender: {type: String, enum:["Male", "Female", "Other"]},
        class:{type: Number,required: true},
        section: {type: String},
        gardianPhno: {type: Number, required: true},
        schoolId: {type: mongoose.Schema.Types.ObjectId, ref: "school", required: true},
        isActive: {type: Boolean, required: true, default: true},
    },{timestamps: true}
)

module.exports=mongoose.model("student",studentSchema)