const express = require('express')
const userRouter =  require('./routes')
const {connectMongoDb} =  require('./connection')
const app =  express();
const PORT = 8000;

// Connection 

connectMongoDb('mongodb://127.0.0.1:27017/urlShortner').then(()=>{
    console.log("MongoDb Connected")
}).catch((err)=>{
    console.log("Error",err);
})

app.use(express.urlencoded({extended:false}));


//Routes
app.use('/',userRouter)
app.listen(PORT,()=>console.log(`Sever started at ${PORT}`))