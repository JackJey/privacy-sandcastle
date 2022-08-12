;(async () => {
  const $iframe = document.createElement("iframe")
  $iframe.width = 300
  $iframe.height = 300
  $iframe.src = "https://ssp.example/ad-tag.html"
  $iframe.setAttribute("scrolling", "no")
  $iframe.setAttribute("style", "border: none")
  const $ins = document.querySelector("ins.ads")
  $ins.appendChild($iframe)
})()
