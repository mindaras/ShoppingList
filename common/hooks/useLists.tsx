import { Navigation, StoredList, Store } from "../types";
import { useState, useEffect } from "react";
import { storage } from "../storage";

const useLists = (navigation?: Navigation) => {
  const [lists, setLists] = useState<StoredList[]>([]);

  const getLists = async () => {
    const lists = await storage.getLists();
    if (lists) setLists(Object.values(lists));
  };

  useEffect(() => {
    if (navigation) {
      return navigation.addListener("focus", getLists);
    }

    getLists();
  }, [navigation]);

  const removeList = async (listId: string) => {
    const lists = await storage.removeList(listId);
    setLists(Object.values(lists));
  };

  return { lists, setLists, removeList };
};

export { useLists };
