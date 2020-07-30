import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../colors";

type Props = {
  onPress: VoidFunction;
  text?: string;
  style?: object | object[];
  type?: "primary" | "secondary";
};

const Button = ({ onPress, text, type = "primary", style }: Props) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: colors[type] }, style]}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{text || "Submit"}</Text>
  </TouchableOpacity>
);

export { Button };

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    width: "100%",
    height: 40,
  },
  buttonText: {
    color: "#fff",
  },
});
