let mongoose = require("mongoose")

let schema = new mongoose.Schema({
    name:{
        type:String,
        required : true,
    },
    email:{
        type:String,
        required:true
    },
    booking:[{
      type:mongoose.Types.ObjectId,
      ref:"booking"
    }],
    password:{
        type:String,
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
    

let model = mongoose.model("user",schema)
module.exports = model