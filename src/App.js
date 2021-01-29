import React, { useEffect } from "react";
import axios from "axios";
import { useObserver } from "mobx-react";
import useStore from "useStore";
import HomePage from "pages/Home/index";

const App = () => {
  const { FavoriteStore, FestivalStore } = useStore();

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const date = new Date();
    const NOW = `${date.getFullYear()}${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }01`;

    const getFestivalData = async () => {
      const festival = await axios
        .get(
          `http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchFestival?serviceKey=${API_KEY}&MobileOS=ETC&MobileApp=AppTest&arrange=A&listYN=Y&eventStartDate=${NOW}`
        )
        .then((res) => {
          return res.data.response.body.items.item;
        });
      FestivalStore.setFestival(festival);
    };

    getFestivalData();
  }, [FestivalStore]);

  return useObserver(() => (
    <div className="App">
      <HomePage />
    </div>
  ));
};

export default App;
