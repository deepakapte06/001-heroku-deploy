const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

require("./models/User");
require("./models/Survey");
require("./services/passport");

mongoose.connect(keys.mongoURI);
const app = express();
app.use(bodyParser.json());

//app.use are middleware - preprocessing of requests before sending them to route handler. wire the middleware one time.
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

//heavily refactored
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
  //express will serve up production assest like main.js or main.css files

  app.use(express.static("client/build"));

  // Express will serve up index.htm,l file if it does not recognize the route

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// [1] test route handler
//app.get("/", (req, res) => {
//  res.send({ hi: "there" });
//});

//env variables set heroku - in prod or use 5000 ( in development)
const PORT = process.env.PORT || 5000;
//app.listen(5000);
app.listen(PORT);
