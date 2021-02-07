import React, { useEffect, useState } from "react";
import { getFestivals } from "components/api/api";
import styled from "styled-components";
import Search from "./_fragments/Search";
import List from "./_fragments/List";

const Festivals = () => {
  const [festivals, setFestivals] = useState([]);

  const getData = () => {
    const response = Promise.resolve(getFestivals());
    response.then((data) => {
      setFestivals(data);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Search
        getData={getData}
        festivals={festivals}
        setFestivals={setFestivals}
      />
      <List festivals={festivals} />
    </Container>
  );
};

export default Festivals;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  width: calc(100% - 40px);
  margin: 20px;
`;
