const mongoose = require("mongoose");

const assignForSchema = mongoose.Schema({
    description:{
        type:String
    },
    assignedFor:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Member",
        required:true
    }],
    taskId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task",
        required:true
    },
    subTaskId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubTask",
        
       
    },
    date:{
        type:Date,
        required:true,
    },
    currentDistrict:{
        type:String,
       
    },
    status:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("AssignFor",assignForSchema)