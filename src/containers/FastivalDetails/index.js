import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Category from "./_fragments/Category";
import Head from "./_fragments/Head";
import Details from "./_fragments/Details";
import Map from "./_fragments/Map";

const FestivalDetails = () => {
  let location = useLocation();
  let history = useHistory();

  useEffect(() => {
    if (location.state === undefined) {
      history.push("/festivals");
    }
  }, [history, location]);

  return (
    <>
      {location.state !== undefined && (
        <Container>
          <Img bg={location.state.festival.image2}></Img>
          <DesContainer>
            <Head festival={location.state.festival} />
            <Category festival={location.state.festival} />
            <Details festival={location.state.festival} />
            <Map
              address={location.state.festival.address}
              title={location.state.festival.title}
            />
          </DesContainer>
        </Container>
      )}
    </>
  );
};

export default FestivalDetails;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const Img = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 440px;
`;

const DesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 60%;
  padding: 10px 0;

  @media only screen and (max-width: 900px) {
    width: 90%;
  }
  @media only screen and (max-width: 700px) {
    width: calc(100% - 20px);
    padding: 0 10px;
  }
`;
