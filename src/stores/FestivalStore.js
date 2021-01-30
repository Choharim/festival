import { observable } from "mobx";

const FestivalStore = observable({
  festivals: [],
  setFestivals(festivals) {
    this.festivals = festivals;
  },
});

export { FestivalStore };
