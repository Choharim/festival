import React, { useEffect } from "react";
import axios from "axios";

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchFestival?serviceKey=${API_KEY}&MobileOS=ETC&MobileApp=AppTest&arrange=A&listYN=Y`
      )
      .then((response) => console.log(response));
  });

  return <div className="App">start</div>;
}

export default App;
