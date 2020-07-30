import { Navigation, CachedList, StorageCache } from "../types";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { config } from "../config";

const useLists = (navigation?: Navigation) => {
  const [lists, setLists] = useState<CachedList[]>([]);

  const getLists = async () => {
    const storageValue = await AsyncStorage.getItem(config.storageKey);

    if (!storageValue) return;

    const { lists }: StorageCache = JSON.parse(storageValue);

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
    const cache = JSON.parse(storageValue as string);
    delete cache.lists[listId];
    await AsyncStorage.setItem(config.storageKey, JSON.stringify(cache));
    setLists(Object.values(cache.lists));
  };

  return { lists, setLists, removeList };
};

export { useLists };
