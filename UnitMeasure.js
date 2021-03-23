import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import {
  AdMobBanner,
  setTestDeviceIDAsync,
  AdMobInterstitial,
} from "expo-ads-admob";

export default class UnitMeasure extends Component {
  async componentDidMount() {
    AdMobInterstitial.setAdUnitID("ca-app-pub-3354722006103179/4096351082");
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    await AdMobInterstitial.showAdAsync();
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
