import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

const Search = ({ getData, festivals, setFestivals }) => {
  const [search, setSearch] = useState("");
  const [similarList, setSimilarList] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [dragRight, setDragRight] = useState(false);
  const history_LS = "searchHistory";
  const date = new Date();
  const inputRef = useRef();
  const currentDate = `${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }.${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
  //input에 blur이벤트 발생시 history,similar 사라지게 근데 history,similar누르면 inputblur처리 되서 history,similar클릭이 안되고 닫힘
  useEffect(() => {
    if (JSON.parse(localStorage.getItem(history_LS))) {
      setSearchHistory(JSON.parse(localStorage.getItem(history_LS)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(history_LS, JSON.stringify(searchHistory));
  }, [searchHistory]);

  /* useEffect(() => {
    window.addEventListener(
      "keydown",
      (e) => e.keyCode === 13 && inputRef.current.focus()
    );
    return window.removeEventListener(
      "keydown",
      (e) => e.keyCode === 13 && inputRef.current.focus()
    );
  }, []);*/

  useEffect(() => {
    if (dragRight) {
      const sortFestivals = () => {
        navigator.geolocation.getCurrentPosition(
          (data) => {
            const latitude = data.coords.latitude;
            const longitude = data.coords.longitude;
            setFestivals(
              [
                ...festivals.map((each) =>
                  Object.assign(each, {
                    distance: getDistance(
                      latitude,
                      longitude,
                      each.coords.latitude,
                      each.coords.longitude,
                      "K"
                    ),
                  })
                ),
              ].sort((a, b) => {
                if (a.distance > b.distance) {
                  return 1;
                }
                if (a.distance < b.distance) {
                  return -1;
                }
                return 0;
              })
            );
          },
          () => {
            setDragRight(false);
          }
        );
      };
      sortFestivals();
    } else {
      getData();
    }
  }, [dragRight]);

  const getDistance = (lat1, lon1, lat2, lon2, unit) => {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      const radlat1 = (Math.PI * lat1) / 180;
      const radlat2 = (Math.PI * lat2) / 180;
      const theta = lon1 - lon2;
      const radtheta = (Math.PI * theta) / 180;
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === "K") {
        dist = dist * 1.609344;
      }
      return dist;
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
    setSearchHistory([
      ...searchHistory,
      { keyWord: search, date: currentDate },
    ]);
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      getData();
      setSimilarList([]);
      setShowHistory(true);
    } else {
      setShowHistory(false);
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
  const putKeyWord = (word, name) => {
    setSearch(word);
    setFestivals(
      festivals.filter(
        (each) =>
          each.title.includes(word) ||
          each.subTitle.includes(word) ||
          each.hashTage.some((ele) => ele.includes(word) || word.includes(ele))
      )
    );
    if (name === "similar") {
      setSearchHistory([
        ...searchHistory,
        { keyWord: word, date: currentDate },
      ]);
    }
    setSimilarList([]);
    setShowHistory(false);
  };
  const RemoveSearchHistory = (index) => {
    setSearchHistory(searchHistory.filter((each, i) => i !== index));
  };

  return (
    <Wrap>
      <Title>어디갈까, 축제</Title>
      <>
        <InputListWrap>
          <SearchContainer onSubmit={handleSubmit}>
            <SearchIcon />
            <SearchInput
              ref={inputRef}
              type="text"
              value={search}
              onChange={handleChange}
              onFocus={() =>
                search === "" ? setShowHistory(true) : setShowHistory(false)
              }
            />
          </SearchContainer>
          {similarList.length !== 0 && (
            <ListBox>
              {similarList.map((each, index) => (
                <SimilarListInput
                  key={index}
                  onClick={() => putKeyWord(each, "similar")}
                >
                  <SimilarSearchIcon />
                  {each.length > 20 ? `${each.slice(0, 20)}...` : each}
                </SimilarListInput>
              ))}
            </ListBox>
          )}
          {showHistory && searchHistory.length !== 0 && (
            <ListBox>
              {searchHistory.map((obj, index) => (
                <HistoryListInput key={index}>
                  <HistoryText
                    onClick={() => putKeyWord(obj.keyWord, "history")}
                  >
                    {obj.keyWord.length > 19
                      ? `${obj.keyWord.slice(0, 19)}...`
                      : obj.keyWord}
                    <HistoryDate>{obj.date}</HistoryDate>
                  </HistoryText>
                  <CloseIcon onClick={() => RemoveSearchHistory(index)} />
                </HistoryListInput>
              ))}
            </ListBox>
          )}
        </InputListWrap>
        <DragSwitchWrap>
          <DragSwitchText>내 위치</DragSwitchText>
          <DragSwitch
            dragRight={dragRight}
            onClick={() => {
              setDragRight(!dragRight);
            }}
          >
            <Switch dragPosition={dragRight ? "4px" : "44px"}></Switch>
          </DragSwitch>
        </DragSwitchWrap>
      </>
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
  align-items: flex-end;
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
  width: 280px;
  outline: none;
  border: none;
`;

const ListBox = styled.div`
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
  display: flex;
  align-items: center;
  padding: 7px 5px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`;

const HistoryListInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 5px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`;

const HistoryText = styled.span`
  width: 100%;
`;

const HistoryDate = styled.span`
  margin-left: 10px;
  font-size: 12px;
  color: #959494;
`;

const CloseIcon = styled(AiOutlineClose)`
  font-size: 16px;
  color: #959494;
`;

const DragSwitchWrap = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const DragSwitchText = styled.span`
  font-size: 13px;
  font-weight: bolder;
  margin-right: 5px;
`;

const DragSwitch = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 60px;
  height: 20px;
  padding: 4px;
  border-radius: 20px;

  cursor: pointer;
  ${(props) =>
    props.dragRight
      ? css`
          background-color: #01d0fb;
        `
      : css`
          background-color: #959494;
        `}
`;

const Switch = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff;
  right: ${(props) => props.dragPosition};
  transition: 0.3s ease;
`;
