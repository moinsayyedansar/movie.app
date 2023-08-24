let express = require("express")
let app = express()
let mongoose = require("mongoose")
let userRoute = require("./routes/userRouter")
let adminRoute = require("./routes/adminRouter")
let movieRoute = require("./routes/movieRouter")
let booking = require("./routes/bookingRouter")
mongoose.connect("mongodb://localhost:27017/moviedb").then(()=>{
    console.log("connection successfull")
}).catch((err)=>{
    console.log(err)
})
app.use(express.json())
app.use("/user",userRoute)
app.use("/admin",adminRoute)
app.use("/movie",movieRoute)
app.use("/booking",booking)


app.listen(3000,(req,res)=>{
    console.log("server created")
})
