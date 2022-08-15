// SSP
import express from "express"
import url from "url"
import { generateSourceKeyPiece, generateTriggerKeyPiece } from "./arapi.js"

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
    }
  })
)
app.set("view engine", "ejs")
app.set("views", "src/views")

app.get("/", async (req, res) => {
  const title = `SSP | Privacy Sandcastle`
  res.render("index.html.ejs", { title })
})

app.get("/ads", async (req, res) => {
  const { advertiser, id } = req.query
  console.log({ advertiser, id })
  const title = `Your special ads from ${advertiser}`
  res.render("ads.html.ejs", { title, advertiser, id })
})

app.get("/move", async (req, res) => {
  const { advertiser, id } = req.query
  console.log({ advertiser, id })
  const url = `https://${advertiser}.example/items/${id}`
  res.redirect(302, url)
})

app.get("/creative", async (req, res) => {
  const { advertiser, id } = req.query

  if (req.headers["attribution-reporting-eligible"]) {
    // TODO: better to add attributionsrc to <a> or other not <img> ?
    const are = res.req.headers["attribution-reporting-eligible"].split(",").map((e) => e.trim())
    console.log({ are })
    if (are.includes("event-source") && are.includes("trigger")) {
      // TODO: refuctoring
      const AttributionReportingRegisterSource = {
        destination: `https://${advertiser}.example`,
        aggregation_keys: {
          key_purchaseCount: generateSourceKeyPiece("COUNT, CampaignID=12, GeoID=7"),
          key_purchaseValue: generateSourceKeyPiece("VALUE, CampaignID=12, GeoID=7")
        },
        source_event_id: `${Math.floor(Math.random() * 1000000000000000)}`,
        debug_key: `deadbeef`
      }
      console.log({ AttributionReportingRegisterSource })
      res.setHeader("Attribution-Reporting-Register-Source", JSON.stringify(AttributionReportingRegisterSource))
    }
  }
  const img = `public/img/${advertiser}/emoji_u${id}.svg`
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url))
  res.status(200).sendFile(img, { root: __dirname })
})

app.get("/ad-tag.html", async (req, res) => {
  res.render("ad-tag.html.ejs")
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
