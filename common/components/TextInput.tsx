import React from "react";
import { TextInput as RNTextInput, StyleSheet } from "react-native";

type Props = {
  placeholder?: string;
  spacing?: boolean;
  value?: string;
  autoFocus?: boolean;
  maxLength?: number;
  onChange: (text: string) => void;
};

const TextInput = ({ placeholder, spacing = true, value, autoFocus, maxLength, onChange }: Props) => (
  <RNTextInput
    placeholder={placeholder}
    style={[styles.input, spacing && styles.spacing]}
    value={value}
    autoCorrect={false}
    autoFocus={autoFocus}
    maxLength={maxLength}
    onChangeText={onChange}
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
