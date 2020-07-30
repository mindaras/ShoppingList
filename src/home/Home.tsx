import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import {
  Navigation,
  Route,
  Modal,
  CachedList,
  StorageCache,
} from "../../common/types";
import { FontAwesome } from "@expo/vector-icons";
import { Container } from "../../common/components/Container";
import { TextInput } from "../../common/components/TextInput";
import { Button } from "../../common/components/Button";
import { colors } from "../../common/colors";
import { config } from "../../common/config";
import AsyncStorage from "@react-native-community/async-storage";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RemoveAction } from "../../common/components/RemoveAction";
import { HomeLists } from "./HomeLists";

type Props = {
  navigation: Navigation;
};

const Home = ({ navigation }: Props) => {
  return (
    <Container scrollable={true} spacing={false} style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.heading, styles.spacing]}>Shopping List</Text>
        <FontAwesome
          name="shopping-basket"
          size={200}
          style={styles.spacing}
          color={colors.secondary}
        />
        <TextInput placeholder="Name" onChange={() => {}} />
        <TextInput placeholder="List ID" onChange={() => {}} />
        <Button
          text="Enter"
          onPress={() => navigation.navigate(Route.List)}
          style={styles.spacing}
        />
        <Button
          text="Create"
          type="secondary"
          onPress={() => navigation.navigate(Modal.CreateList)}
          style={styles.spacing}
        />
      </View>
      <HomeLists navigation={navigation} />
    </Container>
  );
};

export { Home };

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  content: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 34,
    color: colors.secondary,
    fontWeight: "bold",
  },
  spacing: {
    marginBottom: 20,
  },
});
