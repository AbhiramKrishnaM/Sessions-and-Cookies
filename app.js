require("dotenv").config();

const auth = require("./routes/auth.js");
const switcher = require("./routes/switcher.js");
const AuthenticationMiddleware = require("./AuthenticationMiddleware");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

mongoose.connect("mongodb://localhost:27017/session", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const session = require("express-session");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/auth", auth);

app.use("/api", AuthenticationMiddleware, switcher);

app.listen(process.env.PORT, () => {
  console.log("Server runnign at http://localhost:5000");
});
