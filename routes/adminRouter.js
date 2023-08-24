let express = require("express")
let router = express.Router()
let admin = require("../models/admin")
let bcrypt = require("bcrypt")
let jwt = require('jsonwebtoken')

router.get("/alladmins",async(req,res)=>{
  try{
    let alladmins = await admin.find({})
    res.json(alladmins)
  }
  catch(err){
    console.log(err)
  }
  
})

router.post("/register",async(req,res)=>{
    let a ;
      try{
        a = await admin.findOne({email:req.body.email})
      }
      catch(err){
        console.log(err)
      }
      if(!a){
        let hashedpassword =await bcrypt.hash(req.body.password,10)
        admin.create({
            name:req.body.name,
            email:req.body.email,
            password:hashedpassword
        })
        res.send("admin registered succesfully")
      }
      else{
           res.send("please enter different email")
      }
}) 

router.post("/login",async(req,res)=>{
    let a ;
try{
     a =await admin.findOne({email:req.body.email})
}
catch(err){
    console.log(err)
}

if(a){
    let check =await bcrypt.compareSync(req.body.password,a.password)
     if(check){
       
        let token = jwt.sign({id:a._id},"secret",{expiresIn:"2hr"})
        res.send(token)
     }
     else{
        res.send("passowrd do not match")
     }
}
else{
    res.send("user do not exist plz register")
}


})

module.exports = router


