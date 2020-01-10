const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const path = require("path");

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

const userRouter = require("./routes/user");

app.use("/", userRouter);

$.ajax({
  url: "https://lic-hitesh.herokuapp.com/",
  type: "POST",
  headers: { Accept: "application/json;" },
  data: {
    subject: "subject",
    message: "some body text"
  }
}).done(function(res) {
  console.log(res); // it shows your email sent message.
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening On Port: ${PORT}`);
});
