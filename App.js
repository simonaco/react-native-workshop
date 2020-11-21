import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import Deck from "./Deck";
const api = axios.create({
  baseURL: "https://api.yelp.com/v3",
  headers: {
    Authorization: `Bearer ${Constants.manifest.extra.yelpApiKey}`,
  },
});
const userLocation = { latitude: "51.5265", longitude: "-0.0825" };
export default function App() {
  const [coffeeShops, setCoffeeShops] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get("/businesses/search", {
        params: {
          limit: 10,
          categories: "coffee,coffeeroasteries,coffeeshops",
          ...userLocation,
        },
      });
      setCoffeeShops(result.data.businesses);
    };
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <Deck data={coffeeShops}></Deck>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
