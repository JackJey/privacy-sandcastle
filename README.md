# FLEDGE demo

This demo shows a simple example of using FLEDGE to [join ad interest groups](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#11-joining-interest-groups) on two advertiser sites, and then
[initiate an on-device auction](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#2-sellers-run-on-device-auctions)
to select an ad for display on a publisher site.

## 1. Run Chrome from the command line with flags

You will need to use Chrome 96 or above [run from the command line](https://www.chromium.org/developers/how-tos/run-chromium-with-flags) with the following flags.

Using `<fencedframe>` to render ads:

```
--enable-features=InterestGroupStorage,AdInterestGroupAPI,Fledge,FencedFrames
```

Using `<iframe>` to render ads:

```
--enable-features=InterestGroupStorage,AdInterestGroupAPI,Fledge,AllowURNsInIframes --disable-features=FencedFrames
```

## 2. Run the demo

1. Visit both of the demo advertiser sites:

   - [Shopping Site](https://shopping-fledge-demo.glitch.me/advertiser/shopping.html)
   - [Travel Site](https://travel-fledge-demo.glitch.me/advertiser/travel.html)

   `navigator.joinAdInterestGroup()` is called on each of these sites, to ask the browser to add an
   interest group to the groups it is a member of.

   In a real-world implementation, this code is likely to be run by an advertiser's adtech platform or
   the advertiser itself. In this demo, the code is run from [dsp/joinAdInterestGroup.js](https://glitch.com/edit/#!/shopping-fledge-demo?path=dsp%2FjoinAdInterestGroup.js) running in an iframe at [dsp/joinAdInterestGroup.html](https://glitch.com/edit/#!/shopping-fledge-demo?path=dsp%2FjoinAdInterestGroup.html).

2. Visit the demo publisher site:

   - [`<fencedframe>` version](https://publisher-fledge-demo.glitch.me/publisher/index.html?fencedframe)
   - [`<iframe>` version](https://publisher-fledge-demo.glitch.me/publisher/index.html)

     `runAdAuction()` is run on the publisher site in a JavaScript [worklet](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#:~:text=worklet) to select an ad for display.

     In a real-world implementation, this code is likely to be run by the publisher's adtech
     platform or the publisher itself. In this demo, the code is run from [ssp/runAdAuction.js](https://glitch.com/edit/#!/shopping-fledge-demo?path=ssp%2FrunAdAuction.js) running in a [fencedframe](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#:~:text=fenced%20frame) or iframe (depending on which Chrome flags were set) at [ssp/ad-tag.html](https://glitch.com/edit/#!/shopping-fledge-demo?path=ssp%2Fad-tag.html).

## Troubleshoot the demo

If the demo doesn't work as expected, make sure of the following:

- You're using Chrome 96 or above.
- You're running Chrome with the correct flags (see above) using one of the methods described on
  [chromium.org](https://www.chromium.org/developers/how-tos/run-chromium-with-flags)
- You don't have chrome://settings/privacySandbox disabled.
- You don't have an ad blocker or a similar app or extension running.
- You're not in Incognito mode.
- You have third-party cookies enabled via Settings → Security and privacy → Cookies, and other 
site data set to either "Allow all cookies" or "Block third-party cookies in incognito", 
also accessible via chrome://settings/cookies.

## View source code

Code for this demo at [github.com/JackJey/fledge-demo](https://github.com/JackJey/fledge-demo).

## Find out more

- [FLEDGE API developer guide](https://developer.chrome.com/blog/fledge-api/): detailed reference
- [The FLEDGE API](https://developer.chrome.com/docs/privacy-sandbox/fledge/): a less technical overview
- [FLEDGE proposal explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE.md)
- [Proposed First FLEDGE Origin Trial Details](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md)
