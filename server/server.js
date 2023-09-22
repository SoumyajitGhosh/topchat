const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const socket = require("socket.io");
const dotenv = require("dotenv");

// Setting up Express Server
const app = express();

//app config
dotenv.config();

app.get("/api", (req, res) => {
    res.json({"users": ["user1", "user2", "user3"]})
})

app.listen(8585, () => {
    console.log("Server started in port 8585");
})

//DB Connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected"))
  .catch(() => console.log("error occured"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});