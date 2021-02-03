import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Category from "./_fragments/Category";
import Head from "./_fragments/Head";

const FastivalDetails = () => {
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
          </DesContainer>
        </Container>
      )}
    </>
  );
};

export default FastivalDetails;

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
  width: 50%;
`;
