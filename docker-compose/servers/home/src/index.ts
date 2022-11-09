import express, { Application, Request, Response } from "express"

const port = process.env.port || "8080"
const host = process.env.host || "localhost"

const app: Application = express()

app.use(express.static("src/public"))
app.set("view engine", "ejs")
app.set("views", "src/views")

app.get("/", async (req: Request, res: Response) => {
  const hosts = [
    "privacy-sandcastle-home.web.app",
    "privacy-sandcastle-shop.web.app",
    "privacy-sandcastle-travel.web.app",
    "privacy-sandcastle-news.web.app",
    "privacy-sandcastle-ssp.web.app",
    "privacy-sandcastle-dsp.web.app"
  ]
  res.render("index", { hosts })
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
