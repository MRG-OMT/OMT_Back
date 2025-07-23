const mongoose = require("mongoose");

const subTaskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    assignedTo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Member",
        required:true
    }],
    taskId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task",
        required:true
    },
    startDate:{
        type:Date,
        required:true,
    },
    endDate:{
        type:Date,
        required:true
    },
    priority:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }

},{timestamps:true})

module.exports = mongoose.model("SubTask",subTaskSchema)