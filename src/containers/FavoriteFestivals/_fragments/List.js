import React, { useState } from "react";
import styled from "styled-components";
import Toggle from "components/Toggle";
import noCheck from "images/noCheck.png";
import yesCheck from "images/yesCheck.png";
import { BsTrash } from "react-icons/bs";
import useStore from "useStore";
import { useObserver } from "mobx-react";

const List = ({ festivals, setFestivals }) => {
  const [remove, setRemove] = useState([]);
  const { FavoriteStore } = useStore();

  const handleCheck = (title) => (e) => {
    if (title === "all" && remove.length === festivals.length) {
      setRemove([]);
    } else if (title === "all" && remove.length !== festivals.length) {
      setRemove(festivals.map((each) => each.title));
    } else {
      if (remove.some((each) => each === title)) {
        setRemove(remove.filter((each) => each !== title));
      } else {
        setRemove([...remove, title]);
      }
    }
  };

  const removeChecked = () => {
    setFestivals(
      festivals.filter((each) => !remove.some((i) => i === each.title))
    );
    FavoriteStore.upDateFavorite(
      FavoriteStore.favorite.filter((each) => !remove.some((i) => i === each))
    );
    setRemove([]);
  };

  return useObserver(() => (
    <FavoriteContainer>
      <HeadContainer>
        <Subject>가고싶은, 축제</Subject>
        {remove.length === festivals.length ? (
          <IconWrap>
            <CheckCustom
              image={yesCheck}
              onClick={handleCheck("all")}
            ></CheckCustom>
            <Trash onClick={removeChecked} />
          </IconWrap>
        ) : (
          <IconWrap>
            <CheckCustom
              image={noCheck}
              onClick={handleCheck("all")}
            ></CheckCustom>
            <Trash onClick={removeChecked} />
          </IconWrap>
        )}
      </HeadContainer>
      {festivals.map((each) => (
        <FavoriteCard key={each.id}>
          <HeadWrap>
            <Img image={each.image2}></Img>
            <TitleWrap>
              <HeadContainer style={{ margin: "0" }}>
                <Title>{each.title}</Title>
                {remove.some((ele) => ele === each.title) ? (
                  <CheckCustom
                    image={yesCheck}
                    onClick={handleCheck(each.title)}
                  ></CheckCustom>
                ) : (
                  <CheckCustom
                    image={noCheck}
                    onClick={handleCheck(each.title)}
                  ></CheckCustom>
                )}
              </HeadContainer>
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
                  {Object.entries(each.fee).map((arr, i) => (
                    <div key={i}>
                      <span>{arr[0]} : </span>
                      <span>{arr[1]}</span>
                    </div>
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
  ));
};

export default List;

const FavoriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: calc(100% - 40px);
  padding: 20px;
`;

const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const Subject = styled.span`
  font-size: 28px;
  font-family: "Stylish", sans-serif;
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Trash = styled(BsTrash)`
  margin-left: 10px;
  font-size: 25px;
  cursor: pointer;
`;

const CheckCustom = styled.div`
  background-image: url(${(props) => props.image});
  background-size: contain;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const FavoriteCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: calc(100% - 20px);
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
  width: 100%;
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
