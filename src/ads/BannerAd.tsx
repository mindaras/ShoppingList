import React from "react";
import { AdMobBanner } from "expo-ads-admob";
import { config } from "../../common/config";

const BannerAd = () => (
  <AdMobBanner
    bannerSize="mediumRectangle"
    adUnitID={"ca-app-pub-3940256099942544/2934735716" || config.adUnits.modal}
    servePersonalizedAds={false}
  />
);

export { BannerAd };
