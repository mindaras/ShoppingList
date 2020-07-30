import React from "react";
import { StyleSheet } from "react-native";
import { Navigation, Modal } from "../../common/types";
import { Container } from "../../common/components/Container";
import { TextInput } from "../../common/components/TextInput";
import { Button } from "../../common/components/Button";
import { Route } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../../common/colors";

type Props = {
  navigation: Navigation;
  route: Route<Modal.UpdateItems>;
};

type RouteParams = {
  id?: string;
};

const ListMutationModal = ({ navigation, route }: Props) => {
  const { id }: RouteParams = route.params || {};

  const submit = () => {
    if (id) {
      // update
    } else {
      // create
    }

    navigation.goBack();
  };

  return (
    <Container style={styles.container}>
      <FontAwesome
        name={id ? "edit" : "plus"}
        size={200}
        color={colors.secondary}
      />
      <TextInput placeholder="Name" onChange={() => {}} />
      <TextInput placeholder="Info" onChange={() => {}} />
      <Button onPress={submit} text={id ? "Update" : "Create"} />
    </Container>
  );
};

export { ListMutationModal };

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    alignItems: "center",
  },
});
