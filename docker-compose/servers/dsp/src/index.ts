// DSP
import express, { Application, Request, Response } from "express"

const port = process.env.port || "8080"
const host = process.env.host || "localhost"

const app: Application = express()

app.use(
  express.static("src/public", {
    setHeaders: (res: Response, path, stat) => {
      const url = new URL(path, `https://${host}`)
      if (url.pathname.endsWith("bidding_logic.js")) {
        return res.set("X-Allow-FLEDGE", "true")
      }
      if (url.pathname.endsWith("bidding_signal.json")) {
        return res.set("X-Allow-FLEDGE", "true")
      }
    }
  })
)
app.set("view engine", "ejs")
app.set("views", "src/views")

app.get("/", async (req: Request, res: Response) => {
  const title = `DSP - Privacy Sandcastle`
  res.render("index", { title })
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
