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

const url = new URL(location.href)
const advertiser = url.searchParams.get("advertiser")
const id = url.searchParams.get("id")

const adsURL = new URL("https://privacy-sandcastle-ssp.web.app/ads")
adsURL.searchParams.append("advertiser", advertiser)
adsURL.searchParams.append("id", id)

const renderUrl = adsURL.toString()

// Fledge
const interestGroup = {
  name: advertiser,
  owner: "https://privacy-sandcastle-dsp.web.app",

  // x-allow-fledge: true
  biddingLogicUrl: "https://privacy-sandcastle-dsp.web.app/js/bidding_logic.js",

  // x-allow-fledge: true
  trustedBiddingSignalsUrl: "https://privacy-sandcastle-dsp.web.app/bidding_signal.json",
  trustedBiddingSignalsKeys: ["trustedBiddingSignalsKeys-1", "trustedBiddingSignalsKeys-2"],

  dailyUpdateUrl: "https://privacy-sandcastle-dsp.web.app/daily_update_url", // not implemented yet
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
}
console.log(interestGroup)

document.addEventListener("DOMContentLoaded", async (e) => {
  // Fledge
  const kSecsPerDay = 3600 * 24 * 30
  console.log(await navigator.joinAdInterestGroup(interestGroup, kSecsPerDay))

  // Call Topics API for opt-in
  const topics = await document.browsingTopics?.()
  console.log({ topics })
})
