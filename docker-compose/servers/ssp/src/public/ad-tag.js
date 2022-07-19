;(() => {
  const $iframe = document.createElement("iframe")
  $iframe.width = 300
  $iframe.src = "https://ssp.example/ad-tag.html"

  const $script = document.querySelector("script.ssp_tag")
  $script.parentElement.insertBefore($iframe, $script.nextSibling)
})()
