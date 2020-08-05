import React from "react";
import { Container } from "../../common/components/Container";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";
import { useLists } from "../../common/hooks/useLists";
import { Navigation, Route } from "../../common/types";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { colors } from "../../common/colors";
import { RemoveAction } from "../../common/components/RemoveAction";
import { screenWidth } from "../../common/dimensions";

type Props = {
  navigation: Navigation;
};

const Lists = ({ navigation }: Props) => {
  const { lists, removeList } = useLists();

  return (
    <Container spacing={false}>
      <FlatList
        data={lists}
        keyExtractor={({ id }) => id}
        renderItem={({ item: { id, name, username } }) => (
          <Swipeable
            containerStyle={styles.separation}
            childrenContainerStyle={styles.item}
            renderRightActions={(progress) => (
              <RemoveAction progress={progress as Animated.Value} />
            )}
            onSwipeableRightOpen={() => removeList(id)}
            rightThreshold={screenWidth / 5}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(Route.List, {
                  list: { id, name },
                  username,
                });
              }}
              style={styles.content}
            >
              <Text style={styles.text}>{name}</Text>
            </TouchableOpacity>
          </Swipeable>
        )}
      />
    </Container>
  );
};

export { Lists };

const styles = StyleSheet.create({
  spacing: {
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  content: {
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  text: {
    color: "#000",
  },
  separation: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.pale,
  },
  link: {
    color: colors.info,
    textAlign: "center",
  },
});
