let express = require("express")
let Router = express.Router()
let booking = require("../models/booking")
let user = require("../models/user")
let movie = require("../models/movie")
let router = require("./userRouter")
let nodemailer = require("nodemailer")
let jwt = require("jsonwebtoken")



Router.get("/allbooking",async(req,res)=>{
    try{
     let allbooking = await booking.find({})
     res.send(allbooking)
    }
    catch(err){

    }
})

// Router.delete("/:id",async(req,res)=>{
//     try{
//         let book = await booking.findByIdAndRemove(req.params.id).populate("user movie")
//         res.json(book)
//     }catch(err){
// console.log(err)
//     }
// })


Router.get("/:id",async(req,res)=>{
    try{
        let userbook = await booking.findById(req.params.id)
        res.json(userbook)
    }
    catch(err){
        console.log(err)
    }
})

Router.post("/",async(req,res)=>{
     let movies = req.body.movie
     let existingmovie;
     try{
         existingmovie = await movie.findById(movies)
     }
     catch(err){
         console.log(err)
     }  

    if(!existingmovie){
        res.send("please enter valid movie")
    }
   
    let token = req.headers.authorization.split(" ")[1];
    let userid;
    jwt.verify(token,"secret",(err,decrypted)=>{
if(err){
    res.send(err)
}
else{
userid = decrypted.id
}
    })
    
       try{ 
        let b = new booking({
                movie:req.body.movie,
                seatnumber:req.body.seatnumber,
                date:req.body.date,
                user:userid
        })
        let existinguser = await user.findById(userid)
        existingmovie.booking.push(b)
        existinguser.booking.push(b)
        await existingmovie.save()
        await existinguser.save()
        await b.save()
       

        if(b){
            
            let testaccout = await nodemailer.createTestAccount();
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'moises.hills61@ethereal.email',
                    pass: '2EbkdHhrC6eTr8yaKK'
                }
            })

            let info = await transporter.sendMail({
                from: '"moin sayyed" <moises.hills61@ethereal.email>', 
                to: "moinsayyed691@gmail.com",
                subject: "booking", 
                text: "booking succesfully done", 
                html: "<b>you booking has been done</b>",
            })
            res.json({message:"booking done"})

        }
       
    }
    catch(err){
        res.send(err.message)
    }
     
})

module.exports = Router

