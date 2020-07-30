import React from "react";
import { StyleSheet, Text, View, SectionList } from "react-native";
import {
  ShoppingListItem,
  ShoppingListItemStatus,
  ShoppingListItemType,
} from "../../common/types";
import { Container } from "../../common/components/Container";
import { Item } from "../../common/components/Item";

const items: Array<{ title: string; data: ShoppingListItem[] }> = [
  {
    title: new Date(1593252698794).toDateString(),
    data: [
      {
        id: "0",
        name: "Carrots",
        info: "500g",
        author: "Jessica",
        status: ShoppingListItemStatus.BOUGHT,
        updatedBy: "Jessica",
      },
      {
        id: "1",
        name: "Apples",
        info: "500g",
        author: "Jessica",
        status: ShoppingListItemStatus.REMOVED,
        updatedBy: "James",
      },
    ],
  },
  {
    title: new Date(1593152698694).toDateString(),
    data: [
      {
        id: "2",
        name: "Pizza",
        info: "500g",
        author: "Lisa",
        status: ShoppingListItemStatus.REMOVED,
        updatedBy: "Veronica",
      },
    ],
  },
  {
    title: new Date(1593052698694).toDateString(),
    data: [
      {
        id: "3",
        name: "Olives",
        info: "500g",
        author: "James",
        status: ShoppingListItemStatus.BOUGHT,
        updatedBy: "Alex",
      },
    ],
  },
  {
    title: new Date(1592952698694).toDateString(),
    data: [
      {
        id: "4",
        name: "Ice cream",
        info: "500g",
        author: "Alex",
        status: ShoppingListItemStatus.BOUGHT,
        updatedBy: "Alex",
      },
    ],
  },
];

const HistoryList = () => (
  <Container style={styles.container}>
    <SectionList
      sections={items}
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
