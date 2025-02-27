import React, { useRef, useEffect } from "react";
import { Animated, View, StyleSheet } from "react-native";

export default () => {
  const springAnim = useRef(new Animated.ValueXY(0, 0)).current;
  useEffect(() => {
    Animated.spring(springAnim, {
      toValue: { x: 200, y: 500 },
    }).start();
  });
  return (
    <Animated.View style={springAnim.getLayout()}>
      <View style={styles.ball}></View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  ball: {
    borderRadius: 30,
    height: 60,
    width: 60,
    borderWidth: 30,
    borderColor: "black",
  },
});
