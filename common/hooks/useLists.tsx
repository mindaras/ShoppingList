import { Navigation, StoredList, Store } from "../types";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { config } from "../config";

const useLists = (navigation?: Navigation) => {
  const [lists, setLists] = useState<StoredList[]>([]);

  const getLists = async () => {
    const storageValue = await AsyncStorage.getItem(config.storageKey);

    if (!storageValue) return;

    const { lists }: Store = JSON.parse(storageValue);

    if (lists) setLists(Object.values(lists));
  };

  useEffect(() => {
    if (navigation) {
      return navigation.addListener("focus", getLists);
    }

    getLists();
  }, [navigation]);

  const removeList = async (listId: string) => {
    const storageValue = await AsyncStorage.getItem(config.storageKey);
    const store = JSON.parse(storageValue as string);
    delete store.lists[listId];
    await AsyncStorage.setItem(config.storageKey, JSON.stringify(store));
    setLists(Object.values(store.lists));
  };

  return { lists, setLists, removeList };
};

export { useLists };
