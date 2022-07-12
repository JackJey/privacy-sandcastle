// ssp
const auctionConfig = {
  seller: "https://ssp.example", // should https & same as decisionLogicUrl's origin

  // x-allow-fledge: true
  decisionLogicUrl: "https://ssp.example/js/decision-logic.js",

  interestGroupBuyers: [
    // * is not supported yet
    "https://dsp.example"
  ],
  // public for everyone
  auctionSignals: { auction_signals: "auction_signals" },

  // only for single party
  sellerSignals: { seller_signals: "seller_signals" },

  // only for single party
  perBuyerSignals: {
    // listed on interestGroupByers
    "https://dsp.example": {
      per_buyer_signals: "per_buyer_signals"
    }
  }
}

document.addEventListener("DOMContentLoaded", async (e) => {
  const adAuctionResult = await navigator.runAdAuction(auctionConfig)
  console.log({ adAuctionResult })
  const frametype = "iframe" // TODO: fencedframe
  console.log(`display ads in <${frametype}>`)
  const $iframe = document.createElement(frametype)
  $iframe.src = adAuctionResult
  $iframe.setAttribute("mode", "opaque-ads")
  document.body.appendChild($iframe)
})
