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
  const query = new URL(location.href).search
  const frametype = query === "?fencedframe" ? "fencedframe" : "iframe"
  console.log(`display ads in <${frametype}>`)
  const $iframe = document.createElement(frametype)
  $iframe.src = adAuctionResult
  document.body.appendChild($iframe)
})
