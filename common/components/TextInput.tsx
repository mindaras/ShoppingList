import React from "react";
import { TextInput as RNTextInput, StyleSheet } from "react-native";

type Props = {
  placeholder?: string;
  spacing?: boolean;
  onChange: (text: string) => void;
};

const TextInput = ({ placeholder, spacing = true, onChange }: Props) => (
  <RNTextInput
    placeholder={placeholder}
    style={[styles.input, spacing && styles.spacing]}
    onChangeText={onChange}
    autoCorrect={false}
  />
);

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#999",
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  spacing: {
    marginBottom: 20,
  },
});

export { TextInput };
