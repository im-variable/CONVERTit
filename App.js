import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Platform,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import convert from "convert-units";
import Constants from "expo-constants";
import { Picker } from "@react-native-community/picker";
import { AntDesign } from "@expo/vector-icons";
import {
  AdMobBanner,
  AdMobInterstitial,
  setTestDeviceIDAsync,
} from "expo-ads-admob";

const measures = convert().measures();
const primaryColor = "#007399";
const bannerId =
  Platform.OS === "ios"
    ? "ca-app-pub-3354722006103179/1371536277"
    : "ca-app-pub-3354722006103179/5398836229";

const MeasureView = ({ measure, value, setValue }) => {
  const units = convert().possibilities(measure);
  const [fromUnit, setFromUnit] = useState(units[0]);
  const [toUnit, setToUnit] = useState(units[1]);
  const [valueConverted, setValueConverted] = useState(0);

  useEffect(() => {
    setValueConverted(
      convert(+value)
        .from(fromUnit)
        .to(toUnit)
        .toFixed(2)
    );
  }, [value, fromUnit, toUnit]);

  return (
    <View style={styles.scene}>
      <View style={styles.row}>
        <View style={styles.column}>
          <TextInput
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
        <Picker
          style={styles.column}
          selectedValue={fromUnit}
          onValueChange={setFromUnit}
        >
          {units.map((unit, i) => (
            <Picker.Item label={unit} value={unit} key={i} />
          ))}
        </Picker>
      </View>

      <AntDesign
        name="downcircleo"
        size={40}
        color={primaryColor}
        style={{ alignSelf: "center" }}
      />

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>{valueConverted}</Text>
        </View>
        <Picker
          style={styles.column}
          selectedValue={toUnit}
          onValueChange={setToUnit}
        >
          {units.map((unit, i) => (
            <Picker.Item label={unit} value={unit} key={i} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

function unCamelCase(value) {
  return value.replace(/([A-Z])/g, " $1");
}

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState(
    measures.map((m) => ({ key: m, title: unCamelCase(m) }))
  );

  const [value, setValue] = useState("0");

  const renderScene = ({ route }) => {
    return (
      <MeasureView measure={route.key} value={value} setValue={setValue} />
    );
  };

  return (
    <View style={[styles.scene, { marginTop: Constants.statusBarHeight }]}>
      <Text style={styles.title}>Unit of Measurement</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            scrollEnabled
            tabStyle={{ width: "auto" }}
            indicatorStyle={{ backgroundColor: "white" }}
            style={{ backgroundColor: primaryColor }}
          />
        )}
      ></TabView>
      <View style={{ marginBottom: 20, alignSelf: "center" }}>
        <AdMobBanner
          bannerSize="largeBanner"
          adUnitID={bannerId} // Test ID, Replace with your-admob-unit-id
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  title: {
    padding: 15,
    fontWeight: "bold",
    color: primaryColor,
    fontSize: 20,
    textAlign: "center",
    textTransform: "uppercase",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    height: 50,
  },
  input: {
    height: 50,
    borderColor: primaryColor,
    borderBottomWidth: 1,
    fontSize: 30,
    textAlign: "center",
  },
  label: {
    height: 50,
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
});
