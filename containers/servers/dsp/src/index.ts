/*
 Copyright 2022 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

// DSP
import express, { Application, Request, Response } from "express"

const port = "3000"
const host = process.env.host || "localhost"
const token = process.env.token || ""

const app: Application = express()

app.use((req, res, next) => {
  res.setHeader("Origin-Trial", token)
  next()
})

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

app.get("/join-ad-interest-group.html", async (req: Request, res: Response) => {
  const title = "Join Ad Interest Group"
  const host = process.env.DSP_HOST
  const port = process.env.PORT
  const url = new URL(`https://${host}:${port}`)
  url.pathname = "/js/join-ad-interest-group.js"
  const join = url.toString()
  const token = process.env.DSP_TOKEN
  const dsp = { title, token, join }
  res.render("join-ad-interest-group", { title, dsp })
})

app.get("/interest-group.json", async (req: Request, res: Response) => {
  const { advertiser, id } = req.query
  if (advertiser === undefined || id === undefined) {
    return res.sendStatus(400)
  }

  const dsp = new URL(`https://${process.env.DSP_HOST}:${process.env.PORT}`)
  const ssp = new URL(`https://${process.env.SSP_HOST}:${process.env.PORT}`)

  ssp.pathname = "/ads"
  ssp.searchParams.append("advertiser", advertiser as string)
  ssp.searchParams.append("id", id as string)
  const renderUrl = ssp.toString()

  dsp.pathname = "/js/bidding_logic.js"
  const biddingLogicUrl = dsp.toString()

  dsp.pathname = "/bidding_signal.json"
  const trustedBiddingSignalsUrl = dsp.toString()

  dsp.pathname = "/daily_update_url"
  const dailyUpdateUrl = dsp.toString()

  res.json({
    name: advertiser,
    owner: dsp,

    // x-allow-fledge: true
    biddingLogicUrl,

    // x-allow-fledge: true
    trustedBiddingSignalsUrl,
    trustedBiddingSignalsKeys: ["trustedBiddingSignalsKeys-1", "trustedBiddingSignalsKeys-2"],

    dailyUpdateUrl, // not implemented yet
    userBiddingSignals: {
      user_bidding_signals: "user_bidding_signals"
    },
    ads: [
      {
        renderUrl,
        metadata: {
          type: advertiser
        }
      }
    ]
  })
})

app.get("/bidding_signal.json", async (req: Request, res: Response) => {
  res.setHeader("X-Allow-FLEDGE", "true")
  res.json({
    key1: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    key2: "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
  })
})

app.get("/", async (req: Request, res: Response) => {
  const title = process.env.DSP_DETAIL
  const host = process.env.DSP_HOST
  const port = process.env.PORT
  const url = new URL(`https://${host}:${port}`)

  url.pathname = "/dsp-tag.js"
  const tag = url.toString()

  url.pathname = "/js/join-ad-interest-group.js"
  const join = url.toString()

  url.pathname = "/join-ad-interest-group.html"
  url.searchParams.append("advertiser", "privacy-sandcastle-shop")
  url.searchParams.append("id", "1f45e")
  const api = url.toString()

  const dsp = { tag, join, api }
  res.render("index", { title, dsp })
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
