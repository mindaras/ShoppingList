import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { FontAwesome } from "@expo/vector-icons";
import {
  ShoppingListItem,
  ShoppingListItemStatus,
  ShoppingListItemType,
  Navigation,
  Modal,
} from "../types";
import { colors } from "../colors";
import { RemoveAction } from "./RemoveAction";
import { screenWidth } from "../dimensions";

type LeftActionsProps = {
  navigation?: Navigation;
  id: string;
};

const LeftActions = ({ navigation, id }: LeftActionsProps) => (
  <View style={styles.actions}>
    <TouchableOpacity
      onPress={() => {}}
      style={[styles.leftAction, { backgroundColor: colors.success }]}
    >
      <FontAwesome name="check" size={25} color="#fff" />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() =>
        navigation && navigation.navigate(Modal.UpdateItems, { id })
      }
      style={[styles.leftAction, { backgroundColor: colors.info }]}
    >
      <FontAwesome name="edit" size={25} color="#fff" />
    </TouchableOpacity>
  </View>
);

const getUserColor = (icon: string) => {
  switch (icon) {
    case "check":
      return colors.success;
    case "trash":
      return colors.danger;
    default:
      return colors.pale;
  }
};

type UserProps = {
  name: string;
  icon: string;
  itemType?: ShoppingListItemType;
};

const User = ({ name, icon, itemType }: UserProps) => (
  <View style={styles.user}>
    <FontAwesome
      name={icon}
      size={10}
      style={styles.horizontalSpacing}
      color={getUserColor(icon)}
    />
    <Text
      style={[
        styles.userText,
        itemType === ShoppingListItemType.HISTORY && {
          color: getUserColor(icon),
        },
      ]}
    >
      {name}
    </Text>
  </View>
);

type UsersProps = {
  author: string;
  status: ShoppingListItemStatus;
  updatedBy?: string;
  itemType?: ShoppingListItemType;
};

const Users = ({ author, status, updatedBy, itemType }: UsersProps) => {
  const isHistoryItem = itemType === ShoppingListItemType.HISTORY;
  const isUpdatedByAnotherUser = updatedBy && author !== updatedBy;
  const updateIcon =
    status === ShoppingListItemStatus.BOUGHT ? "check" : "trash";

  const getAuthorIcon = () => {
    if (isHistoryItem && !isUpdatedByAnotherUser) {
      return status === ShoppingListItemStatus.BOUGHT ? "check" : "trash";
    }

    return "user";
  };

  return (
    <View style={styles.users}>
      <User name={author} icon={getAuthorIcon()} itemType={itemType} />
      {isUpdatedByAnotherUser && (
        <User
          name={updatedBy as string}
          icon={isHistoryItem ? updateIcon : "pencil"}
          itemType={itemType}
        />
      )}
    </View>
  );
};

interface Props extends ShoppingListItem {
  navigation?: Navigation;
  type?: ShoppingListItemType;
  showSeparator?: boolean;
}

const Item = ({
  navigation,
  id,
  author,
  updatedBy,
  name,
  info,
  status,
  type,
  showSeparator,
}: Props) => (
  <Swipeable
    enabled={type !== ShoppingListItemType.HISTORY}
    containerStyle={showSeparator && styles.separation}
    childrenContainerStyle={styles.container}
    renderLeftActions={() => <LeftActions navigation={navigation} id={id} />}
    renderRightActions={(progress) => (
      <RemoveAction progress={progress as Animated.Value} />
    )}
    onSwipeableRightOpen={() => {}}
    leftThreshold={screenWidth / 5}
    rightThreshold={screenWidth / 5}
  >
    <Users
      author={author}
      status={status}
      updatedBy={updatedBy}
      itemType={type}
    />
    <Text style={styles.text}>{name}</Text>
    <Text style={styles.text}>{info}</Text>
  </Swipeable>
);

export { Item };

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
  },
  text: {
    color: "#000",
  },
  separation: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.pale,
  },
  users: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 5,
    right: 20,
  },
  user: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  userText: {
    fontSize: 12,
    color: colors.pale,
  },
  horizontalSpacing: {
    marginRight: 5,
  },
  actions: {
    flexDirection: "row",
    width: "30%",
  },
  leftAction: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
});
