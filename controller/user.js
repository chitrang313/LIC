const userModel = require('../models/user');
const accountSid = 'ACc6b1b5b930548c2fe01f9911c9199ef4';
const authToken = '2fd5d0678b3e094d57bf6a4263bf8f50';
const client = require('twilio')(accountSid, authToken);

let message;

module.exports.postUserForm = (req,res,next)=>{
    // const user = new userModel({
    //     name:req.body.name,
    //     email:req.body.email,
    //     contactNumber:req.body.contactNumber,
    //     message:req.body.message,        
    // });
    // user.save();
    message = `Name: ${req.body.name} \n\n Email: ${req.body.email} \n\n Contact Number: ${req.body.contactNumber} \n\n Message: ${req.body.message}`
    sendMessage();
    res.json("Post User Form");
};


function sendMessage(){
    client.messages.create({
        from:"whatsapp:+14155238886",
        to:`whatsapp:+918007796351`,
        body: message
    }).then(msg=>{
    console.log(msg);
    });
}