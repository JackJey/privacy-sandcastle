const advertiser = new URL(location.href).searchParams.get("advertiser")
const renderUrl = new URL("https://ssp.example/ads")

// TODO: ads query
renderUrl.searchParams.append("advertiser", "shop")
renderUrl.searchParams.append("id", "1f45e")

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
      renderUrl: renderUrl.toString(),
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
