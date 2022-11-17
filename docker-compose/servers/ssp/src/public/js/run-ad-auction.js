// ssp
const auctionConfig = {
  seller: "https://privacy-sandcastle-ssp.web.app", // should https & same as decisionLogicUrl's origin

  // x-allow-fledge: true
  decisionLogicUrl: "https://privacy-sandcastle-ssp.web.app/js/decision-logic.js",

  interestGroupBuyers: [
    // * is not supported yet
    "https://privacy-sandcastle-dsp.web.app"
  ],
  // public for everyone
  auctionSignals: {
    auction_signals: "auction_signals"
  },

  // only for single party
  sellerSignals: {
    seller_signals: "seller_signals"
  },

  // only for single party
  perBuyerSignals: {
    // listed on interestGroupByers
    "https://privacy-sandcastle-dsp.web.app": {
      per_buyer_signals: "per_buyer_signals"
    }
  }
}

document.addEventListener("DOMContentLoaded", async (e) => {
  // TODO: Call Topics API for select ads
  const topics = await document.browsingTopics()
  console.log({
    topics
  })

  const adAuctionResult = await navigator.runAdAuction(auctionConfig)
  console.log({
    adAuctionResult
  })

  const $fencedframe = document.createElement("fencedframe")
  $fencedframe.src = adAuctionResult
  $fencedframe.setAttribute("mode", "opaque-ads")
  $fencedframe.setAttribute("scrolling", "no")
  $fencedframe.setAttribute("allow", "attribution-reporting; run-ad-auction")
  $fencedframe.width = 300
  $fencedframe.height = 250

  console.log(`display ads in ${$fencedframe}`)

  document.body.appendChild($fencedframe)
})
