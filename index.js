//we are using const because this we are using common js modules module
// es2015 modules supports import
// import on the front end, const require on the back end

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send({ hello: "Buddy" });
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
