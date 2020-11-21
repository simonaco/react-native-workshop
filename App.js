import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import Constants from "expo-constants";
import fixture from "./fixture";
import axios from "axios";
import CoffeeShop from "./CoffeeShop";

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
      console.log(result.data.businesses[0]);
      setCoffeeShops(result.data.businesses);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {coffeeShops.map((coffeeShop, i) => (
        <CoffeeShop coffeeShop={coffeeShop}></CoffeeShop>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
});
