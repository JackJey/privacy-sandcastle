import express, { Application, Request, Response } from "express"

const port = process.env.port || "3000"
const host = process.env.host || "localhost"

const app: Application = express()

app.set("view engine", "ejs")
app.set("views", "src/views")

app.get("/", async (req: Request, res: Response) => {
  console.log(process.env)
  const message = `${host}: ${Date.now()}`
  const hosts = ["advertizer.example", "publisher.example", "dsp.example", "ssp.example"]
  res.render("index", { message, hosts })
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
