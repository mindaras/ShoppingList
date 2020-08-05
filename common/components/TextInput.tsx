import React from "react";
import { TextInput as RNTextInput, StyleSheet } from "react-native";

type Props = {
  placeholder?: string;
  spacing?: boolean;
  value?: string;
  onChange: (text: string) => void;
};

const TextInput = ({ placeholder, spacing = true, value, onChange }: Props) => (
  <RNTextInput
    placeholder={placeholder}
    style={[styles.input, spacing && styles.spacing]}
    value={value}
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
