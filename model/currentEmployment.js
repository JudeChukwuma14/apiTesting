const mongoose = require("mongoose");


const currentEmployerSchema = new mongoose.Schema({
    employerName:{type:String},
    telephone:{type:Number},
    reasonForLeaving:{type:String},
    nameOfLastSupervisor:{type:String}
})

module.exports = mongoose.model("CurrentEmployer",currentEmployerSchema)