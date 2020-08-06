import AsyncStorage from "@react-native-community/async-storage";
import { config } from "./config";
import { Store, StoredLists, StoredList } from "./types";

const getStore = async (): Promise<Store> => {
  const storageValue = await AsyncStorage.getItem(config.storageKey);
  if (!storageValue) return { lists: {} } as any;
  return JSON.parse(storageValue);
};

const getLists = async () => {
  const { lists } = await getStore();
  return lists;
};

const addList = async (list: StoredList) => {
  const store = await getStore();
  store.lists[list.id] = list;
  return AsyncStorage.setItem(config.storageKey, JSON.stringify(store));
};

const removeList = async (listId: string): Promise<StoredLists> => {
  const store = await storage.getStore();
  delete store.lists[listId];
  await AsyncStorage.setItem(config.storageKey, JSON.stringify(store));
  return store.lists;
};

export const storage = { getStore, getLists, addList, removeList };
