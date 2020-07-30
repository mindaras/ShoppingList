import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { colors } from "../colors";

type ToasterType = "Info" | "Error";

type Props = {
  type?: ToasterType;
  message: string;
  show: boolean;
};

const getBackgroundColor = (type?: ToasterType) => {
  switch (type) {
    case "Error":
      return colors.danger;
    default:
      return colors.info;
  }
};

const Toaster = ({ type, message, show }: Props) => {
  const position = useRef(new Animated.Value(-100)).current;

  const changePosition = (value: number) => {
    Animated.timing(position, {
      toValue: value,
      duration: 300,
    }).start();
  };

  useEffect(() => {
    if (show) {
      changePosition(0);
      const timeout = setTimeout(() => changePosition(-100), 2000);
      return () => clearTimeout(timeout);
    }
  }, [show]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(type),
          transform: [{ translateY: position }],
        },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

export { Toaster };

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    padding: 20,
    zIndex: 100,
    elevation: 100,
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },
});
