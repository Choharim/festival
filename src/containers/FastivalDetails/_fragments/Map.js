import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Map = ({ address, title, geolocation }) => {
  const [currentAddress, setCurrentAddress] = useState("");
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
        geocoder.coord2Address(
          geolocation.lon,
          geolocation.lat,
          (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              setCurrentAddress(result[0].address.address_name);
            }
          }
        );
        const showMap = (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            const marker = new kakao.maps.Marker({
              map: map,
              position: coords,
              clickable: true,
            });
            const infowindow = new kakao.maps.InfoWindow({
              content: `<div style="width:150px;text-align:center;padding:6px 0;">${title}<a href="https://map.kakao.com/?sName=${currentAddress}&eName=${address}" style="color:blue" target="_blank"> 길찾기 </a></=https:>`,
            });
            infowindow.open(map, marker);
            map.setCenter(coords);
          }
        };
        geocoder.addressSearch(address, showMap);
      });
    };
  }, [address, title, script, currentAddress, geolocation]);

  return <MapContainer id="myMap"></MapContainer>;
};

export default Map;

const MapContainer = styled.div`
  width: 100%;
  height: 500px;
  margin-bottom: 10px;
  border-radius: 10px;

  @media only screen and (max-width: 500px) {
    height: 300px;
  }
`;
