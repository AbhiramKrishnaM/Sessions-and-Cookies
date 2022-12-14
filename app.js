require("dotenv").config();

const auth = require("./routes/auth.js");
const switcher = require("./routes/switcher.js");

const crypto = require("./routes/crypto.js");
const AuthenticationMiddleware = require("./AuthenticationMiddleware");

const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);

var store = new MongoDBStore({
  uri: "mongodb://localhost:27017/session",
  collection: "mySessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: store,
    resave: true,
    saveUninitialized: false,
  })
);

app.use("/auth", auth);

app.use("/api", AuthenticationMiddleware, switcher);

app.use("/crypto", AuthenticationMiddleware, crypto);

app.listen(process.env.PORT, () => {
  console.log("Server running");
});
