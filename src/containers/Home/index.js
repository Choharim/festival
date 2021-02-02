import React, { useEffect, useState } from "react";
import { useObserver } from "mobx-react";
import FestivalsSlide from "./_fragments/FestivalsSlide";
import Roulette from "./_fragments/Roulette";
import { getFestivals } from "components/api/api";

const Home = () => {
  const [festivalData, setFestivalData] = useState({
    festivals: [],
    isLoading: true,
  });

  useEffect(() => {
    const response = Promise.resolve(getFestivals());

    response.then((data) => {
      setFestivalData({ festivals: data, isLoading: false });
    });
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
