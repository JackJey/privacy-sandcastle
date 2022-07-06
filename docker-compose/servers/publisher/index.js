const express = require('express');
const app = express();

app.set("view engine", "ejs");

app.get('/', function (req, res) {
  const domains = [
    "publisher.example",
    "advertizer.example",
    "dsp.example",
    "ssp.example",
  ]
  res.render("index", { message: `${process.env.host}: ${Date.now()}`, domains });
});

app.listen(process.env.port, function () {
  console.log(`Listening on port ${process.env.port}`);
});