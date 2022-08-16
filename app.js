require("dotenv").config();
const express = require("express");

const session = require("express-session");

const MongoDBSession = require("connect-mongodb-session")(session);

const app = express();

// connecting mongo db
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on("error", (error) => console.error(error));

db.once("open", () => console.log("Connected to database"));

//

const store = new MongoDBSession({
  uri: process.env.DATABASE_URL,
  collection: "mySession",
});

app.use(
  session({
    secret: " Key that will sign the cookie ",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.get("/user", (req, res) => {
  req.session.isAuth = true;
  res.send("Hello");
});

app.listen(5000, () => {
  console.log("Server runnign at local host 5000");
});
