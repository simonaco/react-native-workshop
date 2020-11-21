// Deck.js
import React, { useRef, useState } from "react";
import { Animated, PanResponder, View, Dimensions } from "react-native";
import CoffeeShop from "./CoffeeShop";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_COMPLETION_DURATION = 500;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export default ({ data, onSwipeLeft = () => {}, onSwipeRight = () => {} }) => {
  const position = useRef(new Animated.ValueXY()).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const persistentIdex = useRef({});
  persistentIdex.current = currentIndex;
  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "+120deg"],
    });
    return { transform: [...position.getTranslateTransform(), { rotate }] };
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  };
  const forceSwipe = (direction, onSwipeComplete) => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_COMPLETION_DURATION,
      useNativeDriver: true,
    }).start(() => onSwipeComplete(direction));
  };
  const swipeCb = (direction) => {
    const item = data[currentIndex];
    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    setCurrentIndex(persistentIdex.current + 1);
    position.setValue({ x: 0, y: 0 });
  };
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        position.setOffset({
          x: position.x._value,
          y: position.y._value,
        });
      },
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        console.log("CALL RELEASE");
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe("right", swipeCb);
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe("left", swipeCb);
        } else {
          resetPosition(position);
        }
      },
    })
  ).current;
  return (
    <View>
      {data.map((coffeeShop, index) => {
        if (index < currentIndex) return null;
        if (index === currentIndex) {
          return (
            <Animated.View style={getCardStyle()} {...panResponder.panHandlers}>
              <CoffeeShop coffeeShop={coffeeShop} />
            </Animated.View>
          );
        }
        return <CoffeeShop coffeeShop={coffeeShop} />;
      })}
    </View>
  );
};
