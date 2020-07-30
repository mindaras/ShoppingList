import React from "react";
import { TouchableHighlight, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  onPress: VoidFunction;
};

const AddButton = ({ onPress }: Props) => (
  <TouchableHighlight onPress={onPress} style={styles.container}>
    <FontAwesome name="plus" size={30} color="#fff" />
  </TouchableHighlight>
);

export { AddButton };

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: "#789e9e",
  },
});
