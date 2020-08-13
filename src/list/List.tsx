import React, { useEffect } from "react";
import {
  Navigation,
  Modal,
  ShoppingListItemStatus,
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
  const { id } = list;
  const { data, error, refetch } = useQuery(ITEMS_QUERY, {
    variables: {
      listId: id,
      status: ShoppingListItemStatus.PENDING,
    },
  });
  const { shoppingListItems } = data || { shoppingListItems: [] };

  useEffect(() => {
    return navigation.addListener("focus", () => {
      if (data || error) {
        refetch();
      }
    });
  }, [navigation, data, error, refetch]);

  return (
    <Container spacing={false}>
      <FlatList
        data={shoppingListItems}
        keyExtractor={({ id }) => id}
        renderItem={({ item, index }) => (
          <Item
            {...item}
            username={username}
            navigation={navigation}
            showSeparator={shoppingListItems.length - 1 !== index}
            listId={id}
            onChange={refetch}
          />
        )}
      />
      <AddButton
        onPress={() =>
          navigation.navigate(Modal.MutateItem, { listId: id, username })
        }
      />
    </Container>
  );
};

export { List };
