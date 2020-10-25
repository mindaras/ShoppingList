import React, { useState, Fragment } from "react";
import { StyleSheet, Image } from "react-native";
import { Navigation, Modal } from "../../common/types";
import { Container } from "../../common/components/Container";
import { TextInput } from "../../common/components/TextInput";
import { Button } from "../../common/components/Button";
import { Route as NavigationRoute } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";
import { Toaster } from "../../common/components/Toaster";
import { createItemImage, editItemImage } from "../../assets";

type Props = {
  navigation: Navigation;
  route: NavigationRoute<Modal.MutateItem>;
};

type RouteParams = {
  name?: string;
  info?: string;
  itemId?: string;
  listId?: string;
  username: string;
};

const CREATE_QUERY = gql`
  mutation createShoppingListItem(
    $listId: ID!
    $author: String!
    $input: ShoppingListItemInput!
  ) {
    createShoppingListItem(listId: $listId, author: $author, input: $input) {
      id
      name
      info
      author
      status
    }
  }
`;

const UPDATE_QUERY = gql`
  mutation updateShoppingListItem(
    $id: ID!
    $updatedBy: String!
    $input: ShoppingListItemInput!
  ) {
    updateShoppingListItem(id: $id, updatedBy: $updatedBy, input: $input) {
      id
      name
      info
      author
      status
      updatedBy
    }
  }
`;

const ItemMutationModal = ({ navigation, route }: Props) => {
  const {
    listId,
    itemId,
    name: itemName,
    info: itemInfo,
    username,
  } = (route.params || {}) as RouteParams;
  const [name, setName] = useState(itemName || "");
  const [info, setInfo] = useState(itemInfo || "");
  const [create, { error: creationError }] = useMutation(CREATE_QUERY);
  const [update, { error: updateError }] = useMutation(UPDATE_QUERY);

  navigation.setOptions({ title: itemName || "Add an item" });

  const submit = async () => {
    if (name.trim()) {
      if (itemId) {
        await update({
          variables: { id: itemId, updatedBy: username, input: { name, info } },
        });
      } else {
        await create({
          variables: { listId, author: username, input: { name, info } },
        });
      }

      if (!creationError && !updateError) {
        navigation.goBack();
      }
    }
  };

  return (
    <Fragment>
      <Toaster
        type="Error"
        message={
          itemId ? "Couldn't update the item" : "Couldn't create the item"
        }
        show={!!creationError || !!updateError}
      />
      <Container style={styles.container}>
        <Image source={itemId ? editItemImage : createItemImage} style={styles.image} />
        <TextInput placeholder="Name" autoFocus value={name} onChange={setName} />
        <TextInput placeholder="Info" value={info} onChange={setInfo} />
        <Button onPress={submit} text={itemId ? "Update" : "Create"} />
      </Container>
    </Fragment>
  );
};

export { ItemMutationModal };

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
