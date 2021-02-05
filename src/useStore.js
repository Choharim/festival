import { FavoriteStore } from "stores/FavoriteStore";
import { LogInStore } from "stores/LogInStore";

const useStore = () => {
  return { FavoriteStore, LogInStore };
};

export default useStore;
