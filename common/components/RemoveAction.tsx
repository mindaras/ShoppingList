import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import { colors } from "../colors";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  progress?: Animated.Value;
};

const RemoveAction = ({ progress }: Props) => (
  <View style={styles.container}>
    <Animated.View
      style={
        progress && {
          transform: [
            {
              scale: progress.interpolate({
                inputRange: [0, 0.19, 0.2],
                outputRange: [1, 1, 1.5],
                extrapolate: "clamp",
              }),
            },
          ],
        }
      }
    >
      <FontAwesome name="trash" size={25} color="#fff" />
    </Animated.View>
  </View>
);

export { RemoveAction };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    backgroundColor: colors.danger,
  },
});
