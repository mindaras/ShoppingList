import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  DatePickerAndroid,
} from "react-native";
import {
  ShoppingListItem,
  ShoppingListItemType,
  ShoppingList,
} from "../../common/types";
import { Container } from "../../common/components/Container";
import { Item } from "../../common/components/Item";
import { gql, useQuery } from "@apollo/client";

const ITEMS_QUERY = gql`
  query handledShoppingListItems($listId: ID!) {
    handledShoppingListItems(listId: $listId) {
      id
      name
      info
      status
      author
      updatedBy
      updatedAt
    }
  }
`;

type Props = {
  list: ShoppingList;
};

const HistoryList = ({ list }: Props) => {
  const { id } = list;
  const { data } = useQuery(ITEMS_QUERY, { variables: { listId: id } });
  const { handledShoppingListItems } = data || { handledShoppingListItems: [] };

  const sections = handledShoppingListItems.reduce(
    (acc: any, curr: ShoppingListItem) => {
      const key = new Date(
        parseInt(curr.updatedAt as string, 10)
      ).toDateString();
      const existingItems = acc[key] || [];
      acc[key] = [...existingItems, curr];
      return acc;
    },
    {}
  );

  const items = Object.entries(sections).map(([title, data]) => ({
    title,
    data,
  }));

  return (
    <Container style={styles.container}>
      <SectionList
        sections={items as any}
        keyExtractor={({ id }) => id}
        renderItem={({ item, index, section }) => (
          <Item
            {...item}
            type={ShoppingListItemType.HISTORY}
            showSeparator={index !== section.data.length - 1}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View
            style={[
              styles.header,
              title !== (items[0] || {}).title && styles.topSeparation,
            ]}
          >
            <Text style={styles.headerText}>{title}</Text>
          </View>
        )}
      />
    </Container>
  );
};

export { HistoryList };

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  header: {
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#999",
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
  },
  topSeparation: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
