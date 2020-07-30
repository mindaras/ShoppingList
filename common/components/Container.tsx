import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

type Props = {
  scrollable?: boolean;
  spacing?: boolean;
  style?: object | object[];
};

const Container: React.FunctionComponent<Props> = ({
  children,
  scrollable,
  spacing = true,
  style,
}) => {
  const Wrapper = scrollable ? ScrollView : View;

  return (
    <Wrapper
      style={[styles.container, spacing && { paddingHorizontal: 20 }, style]}
    >
      {children}
    </Wrapper>
  );
};

export { Container };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
