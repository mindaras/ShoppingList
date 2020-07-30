import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "./src/home/Home";
import { FontAwesome } from "@expo/vector-icons";
import { Navigation, Modal, Route } from "./common/types";
import { colors } from "./common/colors";
import { ListMutationModal } from "./src/modals/ListMutationModal";
import { List } from "./src/list/List";
import { HistoryList } from "./src/list/HistoryList";
import { ListCreationModal } from "./src/modals/ListCreationModal";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { config } from "./common/config";
import { Lists } from "./src/lists/Lists";

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();
const ListStack = createBottomTabNavigator();

const ListStackNavigator = ({ navigation }: { navigation: Navigation }) => {
  useEffect(() => {
    navigation.setOptions({ title: "Jessica's list" });
  }, []);

  return (
    <ListStack.Navigator
      screenOptions={({ route }) => ({
        cardStyle: styles.screen,
        tabBarIcon: ({ color, size }) => (
          <FontAwesome
            name={route.name === Route.List ? "list" : "history"}
            size={size}
            color={color}
          />
        ),
      })}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.pale,
      }}
    >
      <ListStack.Screen name={Route.List} component={List} />
      <ListStack.Screen name={Route.History} component={HistoryList} />
    </ListStack.Navigator>
  );
};

const MainStackNavigator = () => (
  <MainStack.Navigator
    screenOptions={{
      headerTintColor: colors.primary,
      headerTitleStyle: styles.header,
      cardStyle: styles.screen,
    }}
  >
    <MainStack.Screen name={Route.Home} component={Home} />
    <MainStack.Screen name={Route.Lists} component={Lists} />
    <MainStack.Screen name={Route.List} component={ListStackNavigator} />
  </MainStack.Navigator>
);

const client = new ApolloClient({
  uri: config.api,
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <NavigationContainer>
      <RootStack.Navigator
        mode="modal"
        screenOptions={{ cardStyle: styles.screen }}
      >
        <RootStack.Screen
          name="Main"
          component={MainStackNavigator}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name={Modal.UpdateItems}
          component={ListMutationModal}
          options={{
            title: "Add an item",
            headerBackTitle: "Back",
          }}
        />
        <RootStack.Screen
          name={Modal.CreateList}
          component={ListCreationModal}
          options={{
            title: "Create an item",
            headerBackTitle: "Back",
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  </ApolloProvider>
);

export default App;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#fff",
  },
  header: {
    color: "#000",
  },
});
