import AsyncStorage from "@react-native-community/async-storage";
import { config } from "./config";
import { Store, StoredLists, StoredList } from "./types";

const getStore = async (): Promise<Store> => {
  const storageValue = await AsyncStorage.getItem(config.storageKey);
  const store = storageValue ? JSON.parse(storageValue) : {};
  return { lists: {}, recentLists: [], ...store };
};

const getLists = async () => {
  const { lists, recentLists } = await getStore();
  return { lists, recentLists };
};

const addList = async (list: StoredList) => {
  const store = await getStore();
  const recentListIndex = store.recentLists.findIndex(
    ({ id }) => id === list.id
  );

  if (recentListIndex > -1) store.recentLists.splice(recentListIndex, 1);
  else if (store.recentLists.length >= 3) store.recentLists.pop();

  store.lists[list.id] = list;
  store.recentLists.unshift(list);
  return AsyncStorage.setItem(config.storageKey, JSON.stringify(store));
};

const addRecentList = async (list: StoredList) => {
  const store = await getStore();
  const index = store.recentLists.findIndex(({ id }) => id === list.id);

  if (index > -1) {
    store.recentLists.splice(index, 1);
    store.recentLists.unshift(list);
    return AsyncStorage.setItem(config.storageKey, JSON.stringify(store));
  }

  if (store.recentLists.length >= 3) store.recentLists.pop();
  store.recentLists.unshift(list);
  return AsyncStorage.setItem(config.storageKey, JSON.stringify(store));
};

const removeList = async (
  listId: string
): Promise<{ lists: StoredLists; recentLists: StoredList[] }> => {
  const store = await storage.getStore();
  delete store.lists[listId];
  store.recentLists = store.recentLists.filter(({ id }) => id !== listId);
  const lists = Object.values(store.lists);

  if (store.recentLists.length < lists.length && store.recentLists.length < 3) {
    for (let i = lists.length - 1; i >= 0; i--) {
      const list = lists[i];

      if (!store.recentLists.find(({ id }) => id === list.id)) {
        store.recentLists.push(list);
        break;
      }
    }
  }

  await AsyncStorage.setItem(config.storageKey, JSON.stringify(store));
  return { lists: store.lists, recentLists: store.recentLists };
};

export const storage = {
  getStore,
  getLists,
  addList,
  addRecentList,
  removeList,
};
