let express = require("express")
let Router = express.Router()
let movie = require("../models/movie")
let admin = require("../models/admin")
let jwt = require("jsonwebtoken")
let booking = require("../models/booking")
let redis = require("redis")
let client = redis.createClient()

Router.get("/allmovies",async(req,res)=>{
    client.get("movie",async(err,data)=>{
          if(data){
            res.json(JSON.parse(data))
          }
          else if(err){
               res.send(err)
          }
          else{
            try{
                let allmovies = await movie.find({})
                client.setex("movie",3600,JSON.stringify(allmovies))
                res.send(allmovies)
            }
            catch(err){
                res.send(err.message)
            }
          }
    })
   
})

Router.get("/:id",async(req,res)=>{
    try{
        let m = await movie.findById(req.params.id)
        res.send(m)
    }
    catch(err){
        res.send(err)
    }
   

})
Router.post("/addmovie",async(req,res)=>{
    let token = req.headers.authorization.split(" ")[1]
   console.log(token)
   let adminid ;
     jwt.verify(token,"secret",(err,decrypted)=>{
       if(err){
        res.send(err)
       }
       else{
       adminid = decrypted.id
       }
    })
    try{
        let x = new movie({
            title:req.body.title,
            description:req.body.description,
            releaseDate:req.body.releaseDate,
            admin:adminid
         })
         await x.save()
         let adm = await admin.findById(adminid)
         adm.movies.push(x)  
         await adm.save()
         if(x){
            res.send("movie created")
            console.log(x)
         }
    }
    catch(err){

    }
   
})


module.exports = Router