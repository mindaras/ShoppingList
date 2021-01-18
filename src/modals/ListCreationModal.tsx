import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { Navigation } from "../../common/types";
import { Container } from "../../common/components/Container";
import { TextInput } from "../../common/components/TextInput";
import { Button } from "../../common/components/Button";
import { gql, useMutation } from "@apollo/client";
import { storage } from "../../common/storage";
import { colors } from "../../common/colors";
import { BannerAd } from "../ads/BannerAd";

const CREATE_LIST = gql`
  mutation createShoppingList($name: String!) {
    createShoppingList(name: $name) {
      id
      name
    }
  }
`;

type Props = {
  navigation: Navigation;
};

const ListCreationModal = ({ navigation }: Props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [createList, { data }] = useMutation(CREATE_LIST);

  useEffect(() => {
    if (!data) return;
    const list = data.createShoppingList;
    storage.addList({ ...list, username }).then(navigation.goBack);
  }, [data]);

  const submit = () => {
    if (name.trim() && username.trim()) {
      createList({ variables: { name } });
    }
  };

  return (
    <Container style={styles.container}>
      <Text style={styles.heading}>Create a list</Text>
      <TextInput placeholder="List name" autoFocus onChange={setName} />
      <TextInput placeholder="Your name" onChange={setUsername} />
      <Button onPress={submit} text="Create" style={styles.button} />
      <BannerAd />
    </Container>
  );
};

export { ListCreationModal };

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    marginBottom: 40,
  },
});
