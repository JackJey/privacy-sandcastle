import express, { Application, Request, Response } from "express"

const port = process.env.port || "8080"
const host = process.env.host || "localhost"

const app: Application = express()

app.use(express.static("src/public"))
app.set("view engine", "ejs")
app.set("views", "src/views")

app.get("/", async (req: Request, res: Response) => {
  const hosts = ["home.example", "shop.example", "travel.example", "news.example", "ssp.example", "dsp.example"]
  res.render("index", { hosts })
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
