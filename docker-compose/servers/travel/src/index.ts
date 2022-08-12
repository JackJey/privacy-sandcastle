import express, { Application, Request, Response } from "express"

const port = process.env.port || "8080"
const host = process.env.host || "localhost"

const app: Application = express()

app.use(express.static("src/public"))
app.set("view engine", "ejs")
app.set("views", "src/views")

app.get("/", async (req: Request, res: Response) => {
  const params = {
    title: "travel",
    ot_token: ""
  }
  res.render("index", params)
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
