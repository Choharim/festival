import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [festivalData, setFestivalData] = useState([]);

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
      setFestivalData(festival);
    };

    getFestivalData();
  }, []);

  console.log(festivalData);
  return <div className="App">start</div>;
}

export default App;
