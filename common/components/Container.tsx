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
  const props = {
    style: [styles.container, spacing && styles.spacing, !scrollable && style],
  };

  if (scrollable) {
    (props as any).contentContainerStyle = style;
  }

  return <Wrapper {...props}>{children}</Wrapper>;
};

export { Container };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  spacing: {
    paddingHorizontal: 20,
  },
});
