import { observable } from "mobx";

const FavoriteStore = observable({
  favorite: [],
  getFavorite(fav) {
    if (this.favorite.some((each) => each === fav)) {
      this.favorite = this.favorite.filter((each) => each !== fav);
    } else {
      this.favorite = [...this.favorite, fav];
    }
  },
  upDateFavorite(fav) {
    this.favorite = fav;
  },
});

export { FavoriteStore };
