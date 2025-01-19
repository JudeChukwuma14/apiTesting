const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const applicationRoute = require("./routes/appRoute");
const path = require("path");
const contactRouter = require("./routes/contactRoute");
const fileUpload = require("express-fileupload");

mongoose
  .connect(process.env.MONGO_PORT)
  .then(() => {
    console.log("DB is Active");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(fileUpload());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/api", contactRouter);
app.use("/api", applicationRoute);

app.get("/user", (req, res) => {
  res.send(`my local host ${req.protocol}://${req.get("host")}`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is active", port);
});