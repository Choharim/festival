import React, { useEffect } from "react";
import { useObserver } from "mobx-react";
import useStore from "useStore";
import axios from "axios";
import ThisMonth from "./_fragments/ThisMonth";

const Home = () => {
  const { FavoriteStore, FestivalStore } = useStore();

  useEffect(() => {
    const date = new Date();
    const nowDate = `${date.getFullYear()}${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }01`;

    const getFestivalData = async () => {
      const festivals = await axios
        .get("http://localhost:5000/festivals")
        .then((res) => {
          console.log(res.data);
          return res.data;
        });
      FestivalStore.setFestivals(festivals);
    };

    getFestivalData();
  }, [FestivalStore]);

  return useObserver(() => (
    <>
      <ThisMonth festivals={FestivalStore.festivals} />
    </>
  ));
};

export default Home;
