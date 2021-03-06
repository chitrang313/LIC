require("dotenv").config();

let message;
const path = require("path");
const appDir = path.dirname(require.main.filename);
("use strict");
const nodemailer = require("nodemailer");

module.exports.home = (req, res, next) => {
  res.sendFile(path.join(appDir + "/index.html"));
};
let fromEmailId;

module.exports.postUserForm = (req, res, next) => {
  message = `Name: ${req.body.name}
  \nEmail: ${req.body.email}
  \nContact Number: ${req.body.contactNumber}
  \n Message: ${req.body.message}`;
  fromEmailId = req.body.email;

  main().catch(console.error); //send from nodemailer.
  return res.redirect("/");
};

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASS // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: `hiteshjari2011@gmail.com,${process.env.EMAIL}`, // list of receivers // hiteshjari2011@gmail.com
    subject: "LIC | Enquiry ✔", // Subject line
    text: message // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
