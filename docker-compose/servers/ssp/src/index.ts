// SSP
import express, { Application, Request, Response } from "express"

const port = process.env.port || "3000"
const host = process.env.host || "localhost"

const app: Application = express()

app.use(
  express.static("src/public", {
    setHeaders: (res, path, stat) => {
      const url = new URL(path, `https://${host}`)
      if (url.pathname.endsWith("decision-logic.js")) {
        return res.set("X-Allow-FLEDGE", "true")
      }
      if (url.pathname.endsWith("run-ad-auction.js")) {
        res.set("Supports-Loading-Mode", "fenced-frame")
        res.set("Permissions-Policy", "run-ad-auction=(*)")
      }
    }
  })
)
app.set("view engine", "ejs")
app.set("views", "src/views")

app.get("/", async (req: Request, res: Response) => {
  const message = `${host}: ${Date.now()}`
  const hosts = ["advertizer.example", "publisher.example", "dsp.example", "ssp.example", "home.example"]
  res.render("index", { message, hosts })
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
