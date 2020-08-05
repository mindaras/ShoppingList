type NavigationOptions = {
  title: string;
};

type Navigation = {
  navigate: (route: string, params?: object) => void;
  goBack: VoidFunction;
  setOptions: (options: NavigationOptions) => void;
  addListener: (event: string, handler: VoidFunction) => VoidFunction;
};

enum Route {
  Home = "Home",
  List = "List",
  History = "History",
  Lists = "Lists",
}

enum Modal {
  CreateList = "CreateList",
  UpdateItems = "UpdateItems",
}

enum ShoppingListItemStatus {
  PENDING = "PENDING",
  BOUGHT = "BOUGHT",
  REMOVED = "REMOVED",
}

type ShoppingListItem = {
  id: string;
  name: string;
  info: string;
  author: string;
  status: ShoppingListItemStatus;
  updatedAt?: number;
  updatedBy?: string;
};

enum ShoppingListItemType {
  BOARD = "BOARD",
  HISTORY = "HISTORY",
}

type StoredList = {
  id: string;
  name: string;
  username: string;
};

type StoredLists = {
  [id: string]: StoredList;
};

type Store = {
  lists: StoredLists;
};

type ShoppingList = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
};

export {
  Navigation,
  Route,
  Modal,
  ShoppingListItemStatus,
  ShoppingListItem,
  ShoppingListItemType,
  StoredList,
  StoredLists,
  Store,
  ShoppingList,
};
