import { observable } from "mobx";

const FestivalStore = observable({
  festival: [],
  setFestival(festival) {
    this.festival = [...this.festival, festival];
  },
});

export { FestivalStore };
