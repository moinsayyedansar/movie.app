let mongoose = require("mongoose")

let schema = new mongoose.Schema({
     name:{
        type : String,
        required : true
     },
     email:{
        type : String,
        required : true
     },
     password:{
        type : String,
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
     movies: [{
        type:mongoose.Types.ObjectId,
        ref:"movie",
}]
})

schema.pre("save",function(next){
   this.updatedAt = Date.now()
   next()
   })

let model = mongoose.model("admin",schema)
module.exports = model