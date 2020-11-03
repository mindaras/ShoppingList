import React, { useState, Fragment } from "react";
import { StyleSheet, Text } from "react-native";
import { Navigation, Modal } from "../../common/types";
import { Container } from "../../common/components/Container";
import { TextInput } from "../../common/components/TextInput";
import { Button } from "../../common/components/Button";
import { Route as NavigationRoute } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";
import { Toaster } from "../../common/components/Toaster";
import { colors } from "../../common/colors";

type Props = {
  navigation: Navigation;
  route: NavigationRoute<Modal.MutateItem>;
};

type RouteParams = {
  listName: string;
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
    listName,
    itemId,
    name: itemName,
    info: itemInfo,
    username,
  } = (route.params || {}) as RouteParams;
  const [name, setName] = useState(itemName || "");
  const [info, setInfo] = useState(itemInfo || "");
  const [create, { error: creationError }] = useMutation(CREATE_QUERY);
  const [update, { error: updateError }] = useMutation(UPDATE_QUERY);

  navigation.setOptions({ title: listName });

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
        <Text style={styles.heading}>{itemId ? 'Update' : 'Create'} an item</Text>
        <TextInput placeholder="Name" maxLength={40} autoFocus value={name} onChange={setName} />
        <TextInput placeholder="Info (e.g. 20 units)" maxLength={14} value={info} onChange={setInfo} />
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
  heading: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: "bold",
    marginBottom: 20
  },
});
