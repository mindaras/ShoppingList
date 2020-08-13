import React, { useEffect, FunctionComponent } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "./src/home/Home";
import { FontAwesome } from "@expo/vector-icons";
import {
  Navigation,
  Modal,
  Route,
  ShoppingList as ShoppingListType,
} from "./common/types";
import { colors } from "./common/colors";
import { List } from "./src/list/List";
import { HistoryList } from "./src/list/HistoryList";
import { ListCreationModal } from "./src/modals/ListCreationModal";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { config } from "./common/config";
import { Lists } from "./src/lists/Lists";
import { Route as NavigationRoute } from "@react-navigation/native";
import { ItemMutationModal } from "./src/modals/ItemMutationModal";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ListSettingsModal } from "./src/modals/ListSettingsModal";

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();
const ListStack = createBottomTabNavigator();

const ListStackNavigator = ({
  navigation,
  route,
}: {
  navigation: Navigation;
  route: NavigationRoute<Route.List | Route.History>;
}) => {
  const { list, username } = route.params as {
    list: ShoppingListType;
    username: string;
  };

  useEffect(() => {
    navigation.setOptions({
      title: list.name,
      headerRight: ({ tintColor }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(Modal.ListSettings, { list, username })
          }
          style={styles.rightHeaderButton}
        >
          <FontAwesome name="cog" size={30} color={tintColor} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const withListInfo = (Component: FunctionComponent<any>) => {
    return (props: any) => (
      <Component list={list} username={username} {...props} />
    );
  };

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
      <ListStack.Screen name={Route.List} component={withListInfo(List)} />
      <ListStack.Screen
        name={Route.History}
        component={withListInfo(HistoryList)}
      />
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
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    query: {
      fetchPolicy: "no-cache",
    },
  },
});

const App = () => (
  <ApolloProvider client={client}>
    <NavigationContainer>
      <RootStack.Navigator
        mode="modal"
        screenOptions={{
          headerTintColor: colors.primary,
          headerTitleStyle: styles.header,
          cardStyle: styles.screen,
        }}
      >
        <RootStack.Screen
          name="Main"
          component={MainStackNavigator}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name={Modal.MutateItem}
          component={ItemMutationModal}
          options={{ headerBackTitle: "Back" }}
        />
        <RootStack.Screen
          name={Modal.CreateList}
          component={ListCreationModal}
          options={{
            title: "Create an item",
            headerBackTitle: "Back",
          }}
        />
        <RootStack.Screen
          name={Modal.ListSettings}
          component={ListSettingsModal}
          options={{
            title: "List settings",
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
  rightHeaderButton: {
    paddingRight: 10,
  },
});
