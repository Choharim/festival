import React from "react";
import styled from "styled-components";
import Toggle from "components/Toggle";

const List = ({ festivals }) => {
  return (
    <FavoriteContainer>
      {festivals.map((each) => (
        <>
          <FavoriteCard key={each.id}>
            <HeadWrap>
              <Img image={each.image2}></Img>
              <TitleWrap>
                <Title>{each.title}</Title>
                <SubTitle>{each.subTitle}</SubTitle>
                <div>
                  {each.hashTage.map((tage, i) => (
                    <HashTage key={i}>#{tage}</HashTage>
                  ))}
                </div>
              </TitleWrap>
            </HeadWrap>
          </FavoriteCard>
          <Toggle>
            <h1>hi</h1>
          </Toggle>
        </>
      ))}
    </FavoriteContainer>
  );
};

export default List;

const FavoriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px 0;
`;

const FavoriteCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  cursor: pointer;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const HeadWrap = styled.div`
  display: flex;
  width: 100%;
`;

const Img = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  background-image: url(${(props) => props.image});
  background-size: contain;
  margin-right: 10px;
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const Title = styled.span`
  font-weight: bolder;
`;

const SubTitle = styled(Title)`
  font-size: 13px;
  color: #959494;
`;

const HashTage = styled.span`
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 13px;
  color: #959494;
  background-color: #f2f2f2;

  &:not(:last-child) {
    margin-right: 5px;
  }
`;
