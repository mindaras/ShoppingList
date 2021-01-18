import Constants from "expo-constants";

const config = {
  api: "https://shopping-list-api-wo4ox.ondigitalocean.app",
  storageKey: "mindarasShoppingList",
  isDev: !Constants.isDevice && __DEV__,
  adUnits: {
    modal: "ca-app-pub-3157042192874116/2957426551",
  },
};

export { config };
