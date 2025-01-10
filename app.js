const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const allRoute = require("./routes/appRoute");
// const expressHbs = require("express-handlebars");
const path = require("path");
const contactRouter = require("./routes/contactRoute");
// app.engine("hbs", expressHbs.engine({
//   extname: "hbs",
//   defaultLayout: false,
// }))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
mongoose
  .connect(process.env.MONGO_PORT)
  .then(() => {
    console.log("DB is Active");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", contactRouter)
app.use("/api", allRoute);

app.listen(5000, () => {
  console.log("Server is active");
});
