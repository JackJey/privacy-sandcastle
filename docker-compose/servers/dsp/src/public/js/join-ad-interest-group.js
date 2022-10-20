const url = new URL(location.href)
const advertiser = url.searchParams.get("advertiser")
const id = url.searchParams.get("id")

const adsURL = new URL("https://ssp.example/ads")
adsURL.searchParams.append("advertiser", advertiser)
adsURL.searchParams.append("id", id)

const renderUrl = adsURL.toString()

// dsp
const interestGroup = {
  name: advertiser,
  owner: "https://dsp.example",

  // x-allow-fledge: true
  biddingLogicUrl: "https://dsp.example/js/bidding_logic.js",

  // x-allow-fledge: true
  trustedBiddingSignalsUrl: "https://dsp.example/bidding_signal.json",
  trustedBiddingSignalsKeys: ["trustedBiddingSignalsKeys-1", "trustedBiddingSignalsKeys-2"],

  dailyUpdateUrl: "https://dsp.example/daily_update_url", // not implemented yets
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
  console.log(e)
  const kSecsPerDay = 3600 * 24 * 30
  console.log(await navigator.joinAdInterestGroup(interestGroup, kSecsPerDay))
})
