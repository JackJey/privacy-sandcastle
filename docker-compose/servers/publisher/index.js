import express from "express";
import { readFile } from "node:fs/promises";


const port = process.env.port || 3000;
const host = process.env.host || 'localhost';

const app = express();

app.set("view engine", "ejs");

app.get('/', async (req, res) => {
  console.log(process.env)
  const message = `${host}: ${Date.now()}`
  const hosts = [
    "advertizer.example",
    "publisher.example",
    "dsp.example",
    "ssp.example"
  ]
  res.render("index", { message, hosts });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});