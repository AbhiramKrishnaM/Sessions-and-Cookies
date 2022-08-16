const express = require("express");

const session = require("express-session");

const app = express();

app.use(
  session({
    secret: " Key that will sign the cookie ",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/user", (req, res) => {
  req.session.isAuth = true;
  console.log(req.session);
  console.log(req.session.id);
  res.send("Hello");
});

app.listen(5000, () => {
  console.log("Server runnign at local host 5000");
});
