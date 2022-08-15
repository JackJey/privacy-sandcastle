// SSP
import express from "express"
import url from "url"
import { debugKey, sourceEventId, sourceKeyPiece, triggerKeyPiece } from "./arapi.js"

const port = process.env.port || "8080"
const host = process.env.host || "localhost"

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  // enable debug mode
  res.cookie("ar_debug", "1", {
    sameSite: "none",
    secure: true,
    httpOnly: true
  })
  next()
})

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
  const title = "SSP | Privacy Sandcastle"
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

const SCALING_FACTOR_PURCHASE_COUNT = 32768
const SCALING_FACTOR_PURCHASE_VALUE = 22
const debug_key = debugKey()
const source_event_id = sourceEventId()

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
          key_purchaseCount: sourceKeyPiece("COUNT, CampaignID=12, GeoID=7"),
          key_purchaseValue: sourceKeyPiece("VALUE, CampaignID=12, GeoID=7")
        },
        source_event_id,
        debug_key
      }
      console.log({ AttributionReportingRegisterSource })
      res.setHeader("Attribution-Reporting-Register-Source", JSON.stringify(AttributionReportingRegisterSource))
    }
  }
  const img = `public/img/${advertiser}/emoji_u${id}.svg`
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url))
  res.status(200).sendFile(img, { root: __dirname })
})

app.get("/register-trigger", async (req, res) => {
  const { id, quantity } = req.query
  console.log({ id, quantity })

  const productCategory = 25
  const AttributionReportingRegisterTrigger = {
    aggregatable_trigger_data: [
      {
        key_piece: triggerKeyPiece(`ProductCategory=${productCategory}`),
        source_keys: ["key_purchaseCount", "key_purchaseValue"]
      }
    ],
    aggregatable_values: {
      key_purchaseCount: quantity * SCALING_FACTOR_PURCHASE_COUNT,
      key_purchaseValue: parseInt(id) * SCALING_FACTOR_PURCHASE_VALUE
    },
    debug_key
  }
  res.setHeader("Attribution-Reporting-Register-Trigger", JSON.stringify(AttributionReportingRegisterTrigger))
  res.sendStatus(200)
})

app.get("/ad-tag.html", async (req, res) => {
  res.render("ad-tag.html.ejs")
})

app.post("/.well-known/attribution-reporting/debug/report-aggregate-attribution", async (req, res) => {
  const debug_report = req.body
  debug_report.shared_info = JSON.parse(debug_report.shared_info)
  console.log(JSON.stringify(debug_report, " ", " "))
  res.sendStatus(200)
})

app.post("/.well-known/attribution-reporting/report-aggregate-attribution", async (req, res) => {
  const report = req.body
  report.shared_info = JSON.parse(report.shared_info)
  console.log(JSON.stringify(report, " ", " "))
  res.sendStatus(200)
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
