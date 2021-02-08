import React from "react";
import styled from "styled-components";
import Toggle from "components/Toggle";

const List = ({ festivals }) => {
  return (
    <FavoriteContainer>
      {festivals.map((each) => (
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
          <Toggle>
            <DetailsCard>
              <DetailWrap>
                <Text>소개</Text>
                <Contents>{each.desc}</Contents>
              </DetailWrap>
              <DetailWrap>
                <Text>날짜 / 시간</Text>
                <Contents>
                  {each.startDate} ~ {each.endDate} ( {each.time} )
                </Contents>
              </DetailWrap>
              <DetailWrap>
                <Text>주소</Text>
                <Contents>{each.address}</Contents>
              </DetailWrap>
              <DetailWrap>
                <Text>요금</Text>
                <Contents>
                  {Object.entries(each.fee).map((arr) => (
                    <>
                      <span>{arr[0]} : </span>
                      <span style={{ marginRight: "10px" }}>{arr[1]}</span>
                    </>
                  ))}
                </Contents>
              </DetailWrap>
              <DetailWrap>
                <Text>전화번호</Text>
                <Contents>{each.phone}</Contents>
              </DetailWrap>
            </DetailsCard>
          </Toggle>
        </FavoriteCard>
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
  padding: 10px 10px 0;
  border-radius: 10px;
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
  padding-bottom: 10px;
`;

const Img = styled.div`
  width: 90px;
  height: 90px;
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

const DetailsCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 10px 0;
  border-top: 1px solid rgba(27, 31, 35, 0.15);
`;

const DetailWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const Text = styled(SubTitle)`
  width: 100px;
`;

const Contents = styled.span`
  width: 100%;
  font-size: 13px;
`;
