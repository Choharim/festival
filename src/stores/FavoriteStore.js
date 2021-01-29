import { observable } from "mobx";

const FavoriteStore = observable({
  favorite: [],
  getFavorite(fav) {
    this.favorite = [...this.favorite, fav];
  },
});

export { FavoriteStore };
