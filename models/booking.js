let mongoose = require("mongoose")

let schema = new mongoose.Schema({
    movie:{
        type:mongoose.Types.ObjectId,
        ref:"movie",
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    seatnumber:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true
    },
    createdAt:{
        type : Date,
        immutable: true,
        default : Date.now()
    },
    updatedAt:{
        type:Date,
        default: Date.now()
    }
})
schema.pre("save",function(next){
    this.updatedAt = Date.now()
    next()
    })
    

module.exports = mongoose.model("booking",schema)