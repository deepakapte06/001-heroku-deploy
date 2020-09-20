const passport = require("passport");

module.exports = (app) => {
  //request sent first time=> by passport.js
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  //handling the callback from google => by passport.js
  app.get("/auth/google/callback", passport.authenticate("google"));

  // some one who is already a user, get accces to the user.
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  //logout
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });
};
