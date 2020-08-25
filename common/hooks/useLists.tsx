import { Navigation, StoredList } from "../types";
import { useState, useEffect } from "react";
import { storage } from "../storage";

const useLists = (navigation?: Navigation) => {
  const [lists, setLists] = useState<StoredList[]>([]);
  const [recentLists, setRecentLists] = useState<StoredList[]>([]);

  const getLists = async () => {
    const { lists, recentLists } = await storage.getLists();
    setLists(Object.values(lists));
    setRecentLists(recentLists);
  };

  useEffect(() => {
    if (navigation) {
      return navigation.addListener("focus", getLists);
    }

    getLists();
  }, [navigation]);

  const removeList = async (listId: string) => {
    const { lists, recentLists } = await storage.removeList(listId);
    setLists(Object.values(lists));
    setRecentLists(recentLists);
  };

  return { lists, recentLists, removeList };
};

export { useLists };
