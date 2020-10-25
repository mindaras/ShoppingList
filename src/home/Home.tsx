import React, { useState, useEffect, Fragment } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Navigation, Modal, Route, ShoppingList } from "../../common/types";
import { FontAwesome } from "@expo/vector-icons";
import { Container } from "../../common/components/Container";
import { TextInput } from "../../common/components/TextInput";
import { Button } from "../../common/components/Button";
import { colors } from "../../common/colors";
import { HomeLists } from "./HomeLists";
import { gql, useLazyQuery } from "@apollo/client";
import { Toaster } from "../../common/components/Toaster";
import { storage } from "../../common/storage";
import { basketImage } from "../../assets";

type Props = {
  navigation: Navigation;
};

const QUERY_LIST = gql`
  query shoppingList($id: ID!) {
    shoppingList(id: $id) {
      id
      name
    }
  }
`;

const Home = ({ navigation }: Props) => {
  const [username, setUsername] = useState("");
  const [listId, setListId] = useState("");
  const [getList, { data, error }] = useLazyQuery(QUERY_LIST);

  const navigateToList = () => {
    const list = data.shoppingList as ShoppingList;
    storage.addList({ ...list, username }).then(() => {
      navigation.navigate(Route.List, { list, username });
      setUsername("");
      setListId("");
    });
  };

  useEffect(() => {
    if (data) navigateToList();
  }, [data]);

  const submit = () => {
    if (username.trim() && listId.trim()) {
      if (data && data.shoppingList.id === listId) {
        navigateToList();
      } else getList({ variables: { id: listId } });
    }
  };

  return (
    <Fragment>
      <Toaster type="Error" message="Couldn't find the list" show={!!error} />
      <Container scrollable={true} spacing={false} style={styles.container}>
        <View style={styles.content}>
          <Text style={[styles.heading, styles.spacing]}>Shopping List</Text>
          <Image source={basketImage} style={[styles.image, styles.spacing]} />
          <TextInput
            placeholder="Name"
            value={username}
            onChange={setUsername}
          />
          <TextInput
            placeholder="List ID"
            value={listId}
            onChange={setListId}
          />
          <Button text="Enter" onPress={submit} style={styles.spacing} />
          <Button
            text="Create"
            type="secondary"
            onPress={() => navigation.navigate(Modal.CreateList)}
            style={styles.spacing}
          />
        </View>
        <HomeLists navigation={navigation} />
      </Container>
    </Fragment>
  );
};

export { Home };

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  content: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 34,
    color: colors.primary,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginLeft: 20
  },
  spacing: {
    marginBottom: 20,
  },
});
