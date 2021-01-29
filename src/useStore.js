import { FavoriteStore } from "stores/FavoriteStore";
import { FestivalStore } from "stores/FestivalStore";

const useStore = () => {
  return { FavoriteStore, FestivalStore };
};

export default useStore;
