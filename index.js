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
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("./webpack.config.js");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "dist")));

app.use(webpackMiddleware(webpack(webpackConfig)));

app.use("/dist/bundle.js", (req, res) => {
  res.sendFile(path.join(__dirname + "/bundle.js"));
});

app.use("/app/main.css", (req, res) => {
  res.sendFile(path.join(__dirname + "/app/main.css"));
});

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in millisecondes
    keys: [keys.cookieKey]
  })
);

require("./models/Notes");
const Note = mongoose.model("notes");

app.post("/notes/new", (req, res) => {
  console.log("Hello");
  let note = new Note();
  note.author_id = req.body.author_id;
  note.title = req.body.title;
  note.text = req.body.text;
  note.save((err, note) => {
    if (err) {
      throw err;
    } else {
      console.log("Hello from saved");
      res.send(note);
    }
  });
});

app.get("/notes", (req, res) => {
  Note.find({ author_id: "5bcc8672aeaf6563eb4a4be6" }, (err, notes) => {
    if (err) {
      throw err;
    } else {
      res.send(notes);
    }
  });
});

app.delete("/notes/:id", (req, res) => {
  console.log("I should be deleted", req.params.id);
  Note.findOneAndDelete({ _id: req.params.id }, (err, note) => {
    if (err) {
      throw err;
    } else {
      res.end("Note deleted");
    }
  });
});

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
