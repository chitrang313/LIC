const express=require('express');
const app=express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// const mongoose = require("mongoose");

const userRouter = require('./routes/user');

app.use('/',userRouter);

// const uri = "mongodb://localhost/UserDatabase"
// mongoose.connect(uri,{useNewUrlParser: true ,useUnifiedTopology: true },(err,message)=>{
// if(err){
//     return err;
// }
// console.log("Database Connected.");
// });
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
console.log(`Listening On Port: ${PORT}`);
});
