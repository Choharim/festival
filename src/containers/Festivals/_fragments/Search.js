import React, { useState } from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";

const Search = ({ getData, festivals, setFestivals }) => {
  const [search, setSearch] = useState("");
  const [similarList, setSimilarList] = useState([]);
  const keyWord_LS = "keyWord";
  const date = new Date();
  const currentDate = `${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }.${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;

  const gethistory_LS = (value) => {
    if (JSON.parse(localStorage.getItem(keyWord_LS))) {
      localStorage.setItem(
        keyWord_LS,
        JSON.stringify(
          JSON.parse(localStorage.getItem(keyWord_LS)).concat({
            keyWord: value,
            date: currentDate,
          })
        )
      );
    } else {
      localStorage.setItem(
        keyWord_LS,
        JSON.stringify([
          {
            keyWord: value,
            date: currentDate,
          },
        ])
      );
    }
  };

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
    gethistory_LS(search);
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
  const putKeyWord = (word) => {
    setSearch(word);
    setFestivals(
      festivals.filter(
        (each) =>
          each.title.includes(word) ||
          each.subTitle.includes(word) ||
          each.hashTage.some((ele) => ele.includes(word) || word.includes(ele))
      )
    );
    gethistory_LS(word);
    setSimilarList([]);
  };

  return (
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
  );
};

export default Search;

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
