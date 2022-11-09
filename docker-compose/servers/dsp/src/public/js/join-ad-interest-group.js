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

  dailyUpdateUrl: "https://privacy-sandcastle-dsp.web.app/daily_update_url", // not implemented yets
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
  const topics = await document.browsingTopics()
  console.log({ topics })
})
