import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import { Navigation } from "../../common/types";
import { Container } from "../../common/components/Container";
import { TextInput } from "../../common/components/TextInput";
import { Button } from "../../common/components/Button";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../../common/colors";
import { gql, useMutation } from "@apollo/client";
import { storage } from "../../common/storage";
import { createListImage } from "../../assets";

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
      <Image source={createListImage} style={styles.image} />
      <TextInput placeholder="List name" autoFocus onChange={setName} />
      <TextInput placeholder="Your name" onChange={setUsername} />
      <Button onPress={submit} text="Create" />
    </Container>
  );
};

export { ListCreationModal };

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20
  },
});
