import React, { useEffect } from "react";
import styled from "styled-components";
const { kakao } = window;

const Map = ({ address, title }) => {
  useEffect(() => {
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
        });
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${title}</div>`,
        });
        infowindow.open(map, marker);
        map.setCenter(coords);
      }
    };
    geocoder.addressSearch(address, showMap);
  }, [address, title]);

  return <MapContainer id="myMap"></MapContainer>;
};

export default Map;

const MapContainer = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 10px;
`;
