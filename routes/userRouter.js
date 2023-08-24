let express = require("express")
let router = express.Router()
let users = require("../models/user")
let bcrypt = require("bcrypt")
let  Router = require("./movieRouter")
let jwt = require("jsonwebtoken")


router.get("/alluser",async(req,res)=>{
    try{
        let user = await users.find({})
        res.json(user)
    }
     catch(err){
        console.log(err)    
     }
})

router.post("/register",async(req,res)=>{
    let user  = await users.findOne({email:req.body.email})
if(!user){
    try{
        let hashedpassword =await bcrypt.hash(req.body.password,10)
         users.create({
            name:req.body.name,
            email:req.body.email,
            password:hashedpassword
        })
        res.send("user created successfully")
        }
        catch(err){
    console.log(err)
        }
}
else{
res.send("user already exists")
}
})

router.put("/:id",async(req,res)=>{
    let hashedpassword = await bcrypt.hash(req.body.password,10)
    let a = {
        name:req.body.name,
        email:req.body.email,
        password:hashedpassword
    }
    try{
        let user = await users.findByIdAndUpdate(req.params.id,a)
        
    }
    catch(err){
        console.log(err)
    }
})

router.delete("/:id",async(req,res)=>{
  
    let id = req.params.id
    let user ;
    try{
         user = await users.findByIdAndDelete(id)
        console.log(user)
    }
    catch(err){
        console.log(err)
    }
    if(!user){
        return  res.status(500).json({message:"something went wrogn"})
    }
    else{
        return  res.status(200).json({message:"deleted successfully"})
    }
})

router.post("/login",async(req,res)=>{
    let user;
    try{
         user = await users.findOne({email:req.body.email})
    }
       catch(err){
         console.log(err)
       }
       if(!user){
        res.send("enter corect email")
       }
       else{
        let existinguser = bcrypt.compareSync(req.body.password,user.password)
        if(!existinguser){
            res.send("enter correct password")
        }
        else{
          
            let token = jwt.sign({id:user._id},"secret",{expiresIn:"2hr"})
            res.send(token)
        }
       }  
})

module.exports = router