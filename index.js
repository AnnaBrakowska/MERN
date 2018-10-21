//we are using const because this we are using common js modules module
// es2015 modules supports import
// import on the front end, const require on the back end

const express = require("express");
const mongoose = require("mongoose");

//enable cookies
const cookieSession = require("cookie-session");
//tell passport to make use of cookies
const passport = require("passport");
const keys = require("./config/keys");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in millisecondes
    keys: [keys.cookieKey]
  })
);

//we are not exporting anything specific from passport
//*** MAKE SURE MODEL GOES FIRST, OTHERWISE MONGOOSE WILL SCREAM MODEL IS NOT DEFINED***/
require("./models/Users");
require("./services/passport");

//to connect wuth mongoose we only need uri localhost and path, as soon as first record is created the database is created
mongoose.connect(keys.mongoURI);

//required file returns function that can be invoked right away
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
