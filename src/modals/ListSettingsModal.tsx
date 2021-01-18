import React from "react";
import { StyleSheet, Text, View, Clipboard } from "react-native";
import { Container } from "../../common/components/Container";
import { Route as NavigationRoute } from "@react-navigation/native";
import { Modal, ShoppingList } from "../../common/types";
import { colors } from "../../common/colors";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  route: NavigationRoute<Modal.ListSettings>;
};

type RouteParams = {
  list: ShoppingList;
  username: string;
};

const ListSettingsModal = ({ route }: Props) => {
  const { list, username } = route.params as RouteParams;

  return (
    <Container style={styles.container}>
      <Text style={styles.heading}>General information</Text>
      <Text style={styles.spacing}>
        <Text style={styles.bold}>List name:</Text> {list.name}
      </Text>
      <Text style={styles.spacing}>
        <Text style={styles.bold}>Joined as:</Text> {username}
      </Text>
      <View style={styles.inline}>
        <Text style={styles.bold}>List ID: </Text>
        <View style={styles.inline}>
          <Text style={styles.id}>{list.id}</Text>
          <TouchableOpacity onPress={() => Clipboard.setString(list.id)}>
            <FontAwesome name="copy" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export { ListSettingsModal };

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
  },
  heading: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: "bold",
    marginBottom: 20,
  },
  spacing: {
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  inline: {
    flexDirection: "row",
  },
  id: {
    marginRight: 10,
  },
});
