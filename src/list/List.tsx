import React, { useEffect, useState } from "react";
import {
  Navigation,
  Modal,
  ShoppingListItemStatus,
  ShoppingList,
} from "../../common/types";
import { Container } from "../../common/components/Container";
import { gql, useQuery } from "@apollo/client";
import { FlatList, RefreshControl } from "react-native";
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
    pollInterval: 5000,
  });
  const [refreshing, setRefreshing] = useState(false)
  const { shoppingListItems } = data || { shoppingListItems: [] };

  useEffect(() => {
    return navigation.addListener("focus", () => {
      if (data || error) {
        refetch();
      }
    });
  }, [navigation, data, error, refetch]);

  const refresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  return (
    <Container spacing={false}>
      <FlatList
        data={shoppingListItems}
        keyExtractor={({ id }) => id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
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
