let mongoose = require("mongoose")

let schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    releaseDate:{
        type:Date,
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
    },
    booking:[
        {type:mongoose.Types.ObjectId,
        ref:"booking"}
    ],
    admin:{
        type:mongoose.Types.ObjectId,
        ref:"admin",
        required:true
    
    }
})
schema.pre("save",function(next){
    this.updatedAt = Date.now()
    next()
    })
    
let model = mongoose.model("movie",schema)
module.exports = model