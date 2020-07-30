import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Navigation, StorageCache } from "../../common/types";
import { Container } from "../../common/components/Container";
import { TextInput } from "../../common/components/TextInput";
import { Button } from "../../common/components/Button";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../../common/colors";
import { gql, useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";
import { config } from "../../common/config";

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
  const [createList, { data }] = useMutation(CREATE_LIST);

  useEffect(() => {
    if (!data) return;

    const item = data.createShoppingList;

    AsyncStorage.getItem(config.storageKey)
      .then((value) => {
        const cache: StorageCache = value ? JSON.parse(value) : { lists: {} };
        cache.lists[item.id] = item;
        return AsyncStorage.setItem(config.storageKey, JSON.stringify(cache));
      })
      .then(navigation.goBack);
  }, [data]);

  const submit = () => {
    if (name) {
      createList({ variables: { name } });
    }
  };

  return (
    <Container style={styles.container}>
      <FontAwesome name="list" size={200} color={colors.secondary} />
      <TextInput placeholder="Name" onChange={setName} />
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
});