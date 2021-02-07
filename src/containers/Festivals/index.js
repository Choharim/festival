import React, { useEffect, useState } from "react";
import { getFestivals } from "components/api/api";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useObserver } from "mobx-react";
import useStore from "useStore";
import { BsFillBookmarkFill, BsBookmark, BsSearch } from "react-icons/bs";
import { BiError } from "react-icons/bi";

const Festivals = () => {
  const { FavoriteStore } = useStore();
  const [festivals, setFestivals] = useState([]);
  const [search, setSearch] = useState("");
  const [similarList, setSimilarList] = useState([]);
  let history = useHistory();

  const getData = () => {
    const response = Promise.resolve(getFestivals());
    response.then((data) => {
      setFestivals(data);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSimilarList([]);
    setFestivals(
      festivals.filter(
        (each) =>
          each.title.includes(search) ||
          each.subTitle.includes(search) ||
          each.hashTage.some(
            (ele) => ele.includes(search) || search.includes(ele)
          )
      )
    );
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      getData();
      setSimilarList([]);
    } else {
      setSimilarList([
        ...new Set(
          [
            ...festivals.map((each) =>
              each.title.includes(e.target.value) ? each.title : null
            ),
            ...festivals.map((each) =>
              each.subTitle.includes(e.target.value) ? each.subTitle : null
            ),
            ...festivals
              .map((each) =>
                each.hashTage.some(
                  (tage) =>
                    tage.includes(e.target.value) ||
                    e.target.value.includes(tage)
                )
                  ? each.hashTage.filter(
                      (tage) =>
                        tage.includes(e.target.value) ||
                        e.target.value.includes(tage)
                    )
                  : null
              )
              .flat(),
          ].filter((list) => list !== null)
        ),
      ]);
    }
  };
  const putKeyWord = (keyWord) => {
    setSearch(keyWord);
    setFestivals(
      festivals.filter(
        (each) =>
          each.title.includes(keyWord) ||
          each.subTitle.includes(keyWord) ||
          each.hashTage.some(
            (ele) => ele.includes(keyWord) || keyWord.includes(ele)
          )
      )
    );
    setSimilarList([]);
  };

  console.log(similarList);

  return useObserver(() => (
    <Container>
      <Wrap>
        <Title>어디갈까, 축제</Title>
        <InputListWrap>
          <SearchContainer onSubmit={handleSubmit}>
            <SearchIcon />
            <SearchInput type="text" value={search} onChange={handleChange} />
          </SearchContainer>
          {similarList.length !== 0 && (
            <SimilarListBox>
              {similarList.map((each, index) => (
                <SimilarListInput key={index} onClick={() => putKeyWord(each)}>
                  <SimilarSearchIcon />
                  {each}
                </SimilarListInput>
              ))}
            </SimilarListBox>
          )}
        </InputListWrap>
      </Wrap>
      <Wrap>
        {festivals.map((each) => (
          <FestvivalCard key={each.id}>
            <Img
              image={each.image1}
              id="card"
              onClick={(e) => {
                e.target.id === "card" &&
                  history.push({
                    pathname: `/festivals/:${each.id}`,
                    state: { festival: each },
                  });
              }}
            >
              {FavoriteStore.favorite.some((ele) => ele === each.title) ? (
                <FillBookMark
                  onClick={() => FavoriteStore.getFavorite(each.title)}
                />
              ) : (
                <BookMark
                  onClick={() => FavoriteStore.getFavorite(each.title)}
                />
              )}
            </Img>
            <TextWrap>
              <DesText>{each.subTitle}</DesText>
              <div>
                {each.hashTage.map((tage, i) => (
                  <HashTage key={i}>#{tage}</HashTage>
                ))}
              </div>
            </TextWrap>
          </FestvivalCard>
        ))}
        {festivals.length === 0 && (
          <None>
            <NonIcon />
            <span>검색 결과가 없습니다</span>
          </None>
        )}
      </Wrap>
    </Container>
  ));
};

export default Festivals;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  width: calc(100% - 40px);
  margin: 20px;
`;

const Title = styled.span`
  font-size: 28px;
  font-family: "Stylish", sans-serif;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  &:first-child {
    margin-bottom: 20px;
  }

  @media only screen and (max-width: 700px) {
    justify-content: center;
  }
`;

const InputListWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SearchContainer = styled.form`
  padding: 5px 10px;
  border: 1px solid #959494;
  border-radius: 5px;

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

const SearchIcon = styled(BsSearch)`
  margin-right: 10px;
`;

const SearchInput = styled.input`
  width: 250px;
  outline: none;
  border: none;
`;

const SimilarListBox = styled.div`
  position: absolute;
  top: 36px;
  left: 0;
  display: flex;
  flex-direction: column;
  width: calc(100% - 10px);
  padding: 5px;
  border: 1px solid #dbdbdb;
  background-color: #fff;
  box-shadow: 0 4px 6px 0 rgb(82 91 97 / 18%);
  border-radius: 5px;
  z-index: 10;
`;
const SimilarSearchIcon = styled(BsSearch)`
  margin-right: 5px;
  font-size: 12px;
  color: #959494;
`;

const SimilarListInput = styled.span`
  padding: 7px 5px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`;

const FestvivalCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 32%;
  &:not(:last-child) {
    margin-bottom: 10px;
  }

  @media only screen and (max-width: 1000px) {
    width: 49%;
  }
  @media only screen and (max-width: 700px) {
    width: 90%;
  }
`;

const Img = styled.div`
  position: relative;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 350px;
  border-radius: 15px;
  cursor: pointer;

  @media only screen and (max-width: 700px) {
    height: 400px;
  }
`;

const BookMark = styled(BsBookmark)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 32px;
  color: #fff;
`;

const FillBookMark = styled(BsFillBookmarkFill)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 32px;
  color: #fff;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
  width: 100%;
`;

const DesText = styled.span`
  font-size: 18px;
  height: 60px;
`;

const HashTage = styled.span`
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 16px;
  color: #959494;
  background-color: #f2f2f2;

  &:first-child {
    margin-right: 5px;
  }
`;

const None = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const NonIcon = styled(BiError)`
  font-size: 50px;
`;
