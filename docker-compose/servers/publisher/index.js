const express = require('express');
const app = express();

app.set("view engine", "ejs");

app.get('/', function (req, res) {
  res.render("index", { message: `${process.env.host}: ${Date.now()}` });
});

app.listen(process.env.port, function () {
  console.log(`Listening on port ${process.env.port}`);
});