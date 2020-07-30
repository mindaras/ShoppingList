import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { AddButton } from "./AddButton";
import {
  Navigation,
  ShoppingListItem,
  ShoppingListItemStatus,
  Modal,
} from "../../common/types";
import { Container } from "../../common/components/Container";
import { Item } from "../../common/components/Item";

const items: ShoppingListItem[] = [
  {
    id: "0",
    name: "Apples",
    info: "1kg",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
  {
    id: "1",
    name: "Oranges",
    info: "2kg",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
    updatedBy: "Adam",
  },
  {
    id: "2",
    name: "Rice",
    info: "500g",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
    updatedBy: "Jimmy",
  },
  {
    id: "3",
    name: "Chicken",
    info: "500g",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
    updatedBy: "Jordan",
  },
  {
    id: "4",
    name: "Apples",
    info: "1kg",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
  {
    id: "5",
    name: "Oranges",
    info: "2kg",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
  {
    id: "6",
    name: "Rice",
    info: "500g",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
  {
    id: "7",
    name: "Chicken",
    info: "500g",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
  {
    id: "8",
    name: "Apples",
    info: "1kg",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
  {
    id: "9",
    name: "Oranges",
    info: "2kg",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
  {
    id: "10",
    name: "Rice",
    info: "500g",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
  {
    id: "11",
    name: "Chicken",
    info: "500g",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
  {
    id: "12",
    name: "Apples",
    info: "1kg",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
  {
    id: "13",
    name: "Oranges",
    info: "2kg",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
  {
    id: "14",
    name: "Rice",
    info: "500g",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
  {
    id: "15",
    name: "Chicken",
    info: "500g",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
  {
    id: "16",
    name: "Apples",
    info: "1kg",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
  {
    id: "17",
    name: "Oranges",
    info: "2kg",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
  {
    id: "18",
    name: "Rice",
    info: "500g",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
  {
    id: "19",
    name: "Chicken",
    info: "500g",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
  {
    id: "20",
    name: "Apples",
    info: "1kg",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
  {
    id: "21",
    name: "Oranges",
    info: "2kg",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
  {
    id: "22",
    name: "Rice",
    info: "500g",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
  {
    id: "23",
    name: "Chicken",
    info: "500g",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
  {
    id: "24",
    name: "Apples",
    info: "1kg",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
  {
    id: "25",
    name: "Oranges",
    info: "2kg",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
  {
    id: "26",
    name: "Rice",
    info: "500g",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
  {
    id: "27",
    name: "Chicken",
    info: "500g",
    author: "Jessica",
    status: ShoppingListItemStatus.PENDING,
  },
];

type Props = {
  navigation: Navigation;
};

const List = ({ navigation }: Props) => (
  <Container spacing={false}>
    <FlatList
      data={items}
      keyExtractor={({ id }) => id}
      renderItem={({ item, index }) => (
        <Item
          {...item}
          navigation={navigation}
          showSeparator={items.length - 1 !== index}
        />
      )}
    />
    <AddButton onPress={() => navigation.navigate(Modal.UpdateItems)} />
  </Container>
);

export { List };
