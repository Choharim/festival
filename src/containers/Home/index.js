import React, { useEffect, useState } from "react";
import { useObserver } from "mobx-react";
import FestivalsSlide from "./_fragments/FestivalsSlide";
import Roulette from "./_fragments/Roulette";
import axios from "axios";

const Home = () => {
  const [festivalData, setFestivalData] = useState({
    festivals: [],
    isLoading: true,
  });

  const getFestivals = async () => {
    const { data } = await axios.get("http://localhost:5000/festivals");
    setFestivalData({ festivals: data, isLoading: false });
  };

  useEffect(() => {
    getFestivals();
  }, []);

  return useObserver(() => (
    <>
      {!festivalData.isLoading && (
        <>
          <Roulette festivals={festivalData.festivals} />
          <FestivalsSlide festivals={festivalData.festivals} />
        </>
      )}
    </>
  ));
};

export default Home;
