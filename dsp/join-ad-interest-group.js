const ads = new URL(location.href).searchParams.get('ads');
console.log(ads);

// dsp
const interestGroup = {
  name: ads,
  owner: 'https://dsp-fledge-demo.glitch.me',

  // x-allow-fledge: true
  biddingLogicUrl: 'https://dsp-fledge-demo.glitch.me/dsp/bidding-logic.js',

  // x-allow-fledge: true
  trustedBiddingSignalsUrl:
    'https://dsp-fledge-demo.glitch.me/dsp/bidding_signal.json',
  trustedBiddingSignalsKeys: ['key1', 'key2'],

  dailyUpdateUrl: 'https://dsp-fledge-demo.glitch.me/dsp/daily_update_url', // not implemented yets
  userBiddingSignals: { user_bidding_signals: 'user_bidding_signals' },
  ads: [
    {
      renderUrl: `https://${ads}-fledge-demo.glitch.me/advertiser/${ads}-ad.html`,
      metadata: {
        type: ads,
      },
    },
  ],
};
console.log(interestGroup);

document.addEventListener('DOMContentLoaded', async (e) => {
  console.log(e);
  const kSecsPerDay = 3600 * 24 * 30;
  console.log(await navigator.joinAdInterestGroup(interestGroup, kSecsPerDay));
});
