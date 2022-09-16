# SSP (Supply Side Platform) in Privacy Sandcastle

## Intro

This app is a demo of "SSP" party in Privacy Sandcastle world.

Privoides 3rd Party Tag for publisher who intends to display ads in their own site (`news` in Privacy Sandcastle).

## How to use 3rd Party Tag

Each site should paste a line below into HTML to embed ads which SSP provides.

```html
<script defer class="ssp_tag" src="https://ssp.example/ad-tag.js"></script>
```

## Inside ad-tag.js

### ad-tag.js

Simply embeding `ad-tag.html` into the caller site.

```html
<iframe allow="attribution-reporting" src="https://ssp.example/ad-tag.html"> </iframe>
```

## ad-tag.html

It's add page by SSP choosing ads to be shown.
Decision logic, running auction can be here.
Embeding `/ads` with some parameters in iframe.

```html
<iframe allow="attribution-reporting" src="https://ssp.example/ad-tag.html">
  <iframe allow="attribution-reporting" src="/ads?advertiser=foo&id=bar"> </iframe>
</iframe>
```

## /ads

Serving requested Ads.
It inclueds ads creative (Image, Video etc).
Clicking ads will guide user to SPP redirector for measurement CTC.

```html
<iframe allow="attribution-reporting" src="https://ssp.example/ad-tag.html">
  <iframe allow="attribution-reporting" src="/ads?advertiser=foo&id=bar">
    <a target="_blank" attributionsrc href="/move">
      <img loading="lazy" attributionsrc src="/creative" />
    </a>
  </iframe>
</iframe>
```

## CAUTION !!!

THIS IS ONLY A DEMO SO SOME SECURITY PROBLEM MAY HAPPEN.
NEVER DEPLY THIS IN PRODUCTION AS-IS.
