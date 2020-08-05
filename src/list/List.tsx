import React from "react";
import {
  Navigation,
  Modal,
  ShoppingListItemStatus,
  Route,
  ShoppingList,
} from "../../common/types";
import { Container } from "../../common/components/Container";
import { gql, useQuery } from "@apollo/client";
import { FlatList } from "react-native";
import { Item } from "../../common/components/Item";
import { AddButton } from "./AddButton";

type Props = {
  navigation: Navigation;
  list: ShoppingList;
  username: string;
};

const ITEMS_QUERY = gql`
  query shoppingListItems($listId: ID!, $status: ShoppingListItemStatus!) {
    shoppingListItems(listId: $listId, status: $status) {
      id
      name
      info
      author
      updatedBy
    }
  }
`;

const List = ({ navigation, list, username }: Props) => {
  const { data } = useQuery(ITEMS_QUERY, {
    variables: {
      listId: list.id,
      status: ShoppingListItemStatus.PENDING,
    },
  });
  const { shoppingListItems } = data || { shoppingListItems: [] };

  return (
    <Container spacing={false}>
      <FlatList
        data={shoppingListItems}
        keyExtractor={({ id }) => id}
        renderItem={({ item, index }) => (
          <Item
            {...item}
            navigation={navigation}
            showSeparator={shoppingListItems.length - 1 !== index}
          />
        )}
      />
      <AddButton
        onPress={() => navigation.navigate(Modal.UpdateItems, { username })}
      />
    </Container>
  );
};

export { List };
