const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

mongoose
  .connect(
    "mongodb+srv://negivikas201:zOBBH8KZd43rBblO@cluster0.ho6yk14.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("databse connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5000, () => {
  console.log("server started");
});
