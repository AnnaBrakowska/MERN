const passport = require("passport");
// "google" is a string that indentifies the function that the autho is going to be done with google
//scope is what you have access to

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  //google strategy handles the exchange of codes here so we need a passport callback
  // code is being turned into a profile here
  app.get("/auth/google/callback", passport.authenticate("google"));
  app.get("/api/logout", (req, res) => {
    //passport function kills the id
    req.logout();
    res.send("You are logged out");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
