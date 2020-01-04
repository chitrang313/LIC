const accountSid = 'ACc6b1b5b930548c2fe01f9911c9199ef4';
const authToken = '7a1d0a27d9d6f62b4ac9e65bc599bc9f';
const client = require('twilio')(accountSid, authToken);
let message;
const path = require('path');
const appDir = path.dirname(require.main.filename);

module.exports.home =(req,res,next)=>{
res.sendFile(path.join(appDir+"/index.html"));
};

module.exports.postUserForm = (req,res,next)=>{
    // const user = new userModel({
    //     name:req.body.name,ss
    //     email:req.body.email,
    //     contactNumber:req.body.contactNumber,
    //     message:req.body.message,        
    // });
    // user.save();

    message=`Name: ${req.body.name}
    \nEmail: ${req.body.email}
    \nContact Number: ${req.body.contactNumber}
    \n Message: ${req.body.message}`
    console.log(req.body);
    
    // fakerMessage=`Name: ${faker.name.findName()}
    // \nEmail: ${req.body.email}
    // \nContact Number: ${req.body.contactNumber}
    // \n Message: ${req.body.message}`

    sendMessage();
    return res.redirect("/");
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