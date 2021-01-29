import React, { useEffect } from "react";
import { useObserver } from "mobx-react";
import useStore from "useStore";
import axios from "axios";
import ThisMonth from "./_fragments/ThisMonth";

const Home = () => {
  const { FavoriteStore, FestivalStore } = useStore();

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const date = new Date();
    const START = `${date.getFullYear()}${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }01`;

    const getFestivalData = async () => {
      const festival = await axios
        .get(
          `http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchFestival?serviceKey=${API_KEY}&MobileOS=ETC&MobileApp=AppTest&arrange=A&listYN=Y&eventStartDate=${START}`
        )
        .then((res) => {
          console.log(res.data.response.body.items.item);
          return res.data.response.body.items.item;
        });
      FestivalStore.setFestival(festival);
    };

    getFestivalData();
  }, [FestivalStore]);

  return useObserver(() => (
    <>
      <ThisMonth festival={FestivalStore.festival} />
    </>
  ));
};

export default Home;
