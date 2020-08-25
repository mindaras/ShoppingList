import React from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
} from "react-native";
import { Navigation, Route } from "../../common/types";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RemoveAction } from "../../common/components/RemoveAction";
import { colors } from "../../common/colors";
import { useLists } from "../../common/hooks/useLists";
import { screenWidth } from "../../common/dimensions";
import { storage } from "../../common/storage";

type Props = {
  navigation: Navigation;
};

const HomeLists = ({ navigation }: Props) => {
  const { lists, recentLists, removeList } = useLists(navigation);

  return (
    <View>
      <View style={styles.spacing}>
        {recentLists.map(({ id, name, username }) => (
          <Swipeable
            key={id}
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
                storage.addRecentList({ id, name, username }).then(() => {
                  navigation.navigate(Route.List, {
                    list: { id, name },
                    username,
                  });
                });
              }}
              style={styles.content}
            >
              <Text style={styles.text}>{name}</Text>
            </TouchableOpacity>
          </Swipeable>
        ))}
      </View>
      {lists.length > 3 && (
        <TouchableOpacity onPress={() => navigation.navigate(Route.Lists)}>
          <Text style={styles.link}>See all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export { HomeLists };

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
