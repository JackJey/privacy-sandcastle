;(async () => {
  const $script = document.querySelector("script.dsp_tag")
  const advertiser = $script.dataset.advertiser
  const id = $script.dataset.id

  const src = new URL("https://dsp.example/join-ad-interest-group.html")
  src.searchParams.append("advertiser", advertiser)
  src.searchParams.append("id", id)

  const $iframe = document.createElement("iframe")
  $iframe.width = 1
  $iframe.height = 1
  $iframe.src = src
  $iframe.allow = "join-ad-interest-group"
  $script.parentElement.insertBefore($iframe, $script.nextSibling)

  const topics = await document.browsingTopics()
  console.log({ topics })
})()
