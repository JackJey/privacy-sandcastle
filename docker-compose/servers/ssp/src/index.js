// SSP
import express from "express"

const port = process.env.port || "8080"
const host = process.env.host || "localhost"

const app = express()

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
      if (res.req.headers["attribution-reporting-eligible"]) {
        const are = res.req.headers["attribution-reporting-eligible"].split(",").map((e) => e.trim())
        if (are.includes("event-source") && are.includes("trigger")) {
          console.log({ are })
        }
      }
    }
  })
)
app.set("view engine", "ejs")
app.set("views", "src/views")

app.get("/", async (req, res) => {
  const title = `SSP | Privacy Sandcastle`
  res.render("index.html.ejs", { title })
})

app.get("/ads/:advertiser/:id", async (req, res) => {
  const { advertiser, id } = req.params
  console.log({ advertiser, id })
  const title = `Your special ads from ${advertiser}`
  res.render("ads.html.ejs", { title, advertiser, id })
})

app.get("/move/:advertiser/:id", async (req, res) => {
  const { advertiser, id } = req.params
  console.log({ advertiser, id })
  const url = `https://${advertiser}.example/items/${id}`
  res.redirect(302, url)
})

app.get("/ad-tag.html", async (req, res) => {
  res.render("ad-tag.html.ejs")
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
