import React, { useState, useEffect } from "react";
import { Card, Icon, Button } from "react-native-elements";
import { Text } from "react-native";
import axios from "axios";
import Constants from "expo-constants";

const api = axios.create({
  baseURL: "https://api.yelp.com/v3",
  headers: {
    Authorization: `Bearer ${Constants.manifest.extra.yelpApiKey}`,
  },
});
export default ({ coffeeShop }) => {
  const [review, setReview] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(`/businesses/${coffeeShop.id}/reviews`);
      setReview(result.data.reviews[0]);
    };
    fetchData();
  }, []);
  return (
    <Card>
      <Card.Title>{coffeeShop.name}</Card.Title>
      <Card.Divider />
      <Card.Image source={{ uri: coffeeShop.image_url }} />
      <Text style={{ marginBottom: 10 }}>{coffeeShop.location.address}</Text>
      <Button
        icon={<Icon name="code" color="#ffffff" />}
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="VIEW NOW"
      />
    </Card>
  );
};
