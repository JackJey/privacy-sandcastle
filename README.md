# FLEDGE DEMO

This demo shows a simple example of using FLEDGE to [join an ad interest group](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#11-joining-interest-groups) and then [initiate an on-device auction](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#2-sellers-run-on-device-auctions).


## Browser Setting

You will need to use **Chrome 96** or above [run with the following flag](https://www.chromium.org/developers/how-tos/run-chromium-with-flags)

If you try `<fencedframe>` version.


```
--enable-features=InterestGroupStorage,AdInterestGroupAPI,Fledge,FencedFrames
```

Or if you try `<iframe>` version.


```
--enable-features=InterestGroupStorage,AdInterestGroupAPI,Fledge --disable-features=FencedFrames
```


## Starting DEMO

Go to the Advertiser sites below for joinInterestGroup() first

- [Shopping Site](https://shopping-fledge-demo.glitch.me/advertiser/shopping.html)
- [Travel Site](https://travel-fledge-demo.glitch.me/advertiser/travel.html)

then Go to the Publisher site to see Ads selected via runAdAuction().

- [Publisher Site (fencedframe)](https://publisher-fledge-demo.glitch.me/publisher/index.html?fencedframe)
- [Publisher Site (iframe)](https://publisher-fledge-demo.glitch.me/publisher/index.html)


## Details of DEMO

![shopping & travel are joinInterestGrouped by DSP and runAdAuction choices Ads in worklet and show it in Publisher](./assets/fledge.png)


## Troubleshooting the demo

If the demo doesn't work as expected, make sure of the following:

- You 're using Chrome 96 or above.
- You're running Chrome with the flags described above using one of the methods described on [chromium.org](https://www.chromium.org/developers/how-tos/run-chromium-with-flags)
- You don't have chrome://settings/privacySandbox disabled.
- You don't have an adblocker or a similar app/extension running.
- You're not in Incognito mode.


##  Source Code

You can see the source code on Github

- <https://github.com/JackJey/fledge-demo>
