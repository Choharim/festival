import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Map = ({ address, title }) => {
  const script = document.createElement("script");
  script.async = true;
  script.src = `https:////dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_MAP_KEY}&libraries=services&autoload=false`;
  document.head.appendChild(script);

  useEffect(() => {
    script.onload = () => {
      const { kakao } = window;
      kakao.maps.load(() => {
        const container = document.getElementById("myMap");
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);
        const geocoder = new kakao.maps.services.Geocoder();
        const showMap = (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            const marker = new kakao.maps.Marker({
              map: map,
              position: coords,
              clickable: true,
            });

            const infowindow = new kakao.maps.InfoWindow({
              content: `<div style="width:150px;text-align:center;padding:6px 0;">${title}</=https:>`,
            });

            infowindow.open(map, marker);
            map.setCenter(coords);
            kakao.maps.event.addListener(marker, "click", () => {
              console.log("길찾기로 바로이동");
            });
          }
        };
        geocoder.addressSearch(address, showMap);
      });
    };
  }, [address, title, script]);

  return <MapContainer id="myMap"></MapContainer>;
};

export default Map;

const MapContainer = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 10px;
`;
