require("dotenv").config();

let message;
const path = require("path");
const appDir = path.dirname(require.main.filename);
("use strict");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

module.exports.home = (req, res, next) => {
  res.sendFile(path.join(appDir + "/index.html"));
};
let fromEmailId;

const accountSid = process.env.ACC_SID;
const authToken = process.env.AUTH;
const client = require("twilio")(accountSid, authToken);
module.exports.postUserForm = (req, res, next) => {
  message = `Name: ${req.body.name}
  \nEmail: ${req.body.email}
  \nContact Number: ${req.body.contactNumber}
  \n Message: ${req.body.message}`;
  fromEmailId = req.body.email;

  client.messages
    .create({
      from: "whatsapp:+14155238886",
      body: message,
      to: "whatsapp:+918007796351"
    })
    .then(message => console.log(message.sid))
    .catch(err => {
      console.log(err);
    });
  //main().catch(console.error); //send from nodemailer.
  return res.redirect("/");
};

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  const OAuth2 = google.auth.OAuth2;
  const oauth2Client = new OAuth2(
    "965537249162-23phhsvafbt0i6js16nglchdt65br3sd.apps.googleusercontent.com", // ClientID
    "LbHI_ygS6sq11bSYuHg-kZrn", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
  );
  oauth2Client.setCredentials({
    refresh_token:
      "1//04f7djSmDQyzECgYIARAAGAQSNgF-L9Ir9lmV8WGELaxlVZiHjgaDnla3otjtSq5V4DYz5zMBlZEeiyYZlVS69ThAIi2pRWDTQQ"
  });
  const accessToken = oauth2Client.getAccessToken();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "chitrang313@gmail.com", // generated ethereal user
      //pass: process.env.PASSWORD, // generated ethereal password
      clientId:
        "965537249162-23phhsvafbt0i6js16nglchdt65br3sd.apps.googleusercontent.com",
      clientSecret: "LbHI_ygS6sq11bSYuHg-kZrn",
      refreshToken:
        "1//04f7djSmDQyzECgYIARAAGAQSNgF-L9Ir9lmV8WGELaxlVZiHjgaDnla3otjtSq5V4DYz5zMBlZEeiyYZlVS69ThAIi2pRWDTQQ",
      accessToken: accessToken
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "chitrang313@gmail.com", // sender address
    to: "hiteshjari2011@gmail.com,chitrang313@gmail.com", // list of receivers // hiteshjari2011@gmail.com
    subject: "LIC | Enquiry ✔", // Subject line
    text: message // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
