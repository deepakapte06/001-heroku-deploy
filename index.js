const express = require("express");
const app = express();

//route handler
app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

//env variables set heroku - in prod or use 5000 ( in development)
const PORT = process.env.PORT || 5000;
//app.listen(5000);
app.listen(PORT);
