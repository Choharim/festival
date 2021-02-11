import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { FaRegPaperPlane } from "react-icons/fa";
import { useObserver } from "mobx-react";
import useStore from "useStore";
import { getFestivals } from "components/api/api";
import user from "images/user.png";
import chatBot from "images/chatBot.png";
import { useHistory } from "react-router-dom";

const ChatBot = () => {
  const [festivals, setFestivals] = useState([]);
  const [chat, setChat] = useState([{ text: "", loading: false }]);
  const [text, setText] = useState("");
  const [userSuccess, setUserSuccess] = useState(false);
  const [botSuccess, setBotSuccess] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [festivalIndex, setFestivalIndex] = useState(0);
  const { LogInStore } = useStore();
  let history = useHistory();

  useEffect(() => {
    const response = Promise.resolve(getFestivals());
    response.then((data) => {
      setFestivals(data);
    });
  }, []);

  useEffect(() => {
    if (LogInStore.logInSuccess) {
      window.setTimeout(
        () =>
          setChat([
            { text: `${LogInStore.nickName}님, 기분이 어때요?`, loading: true },
          ]),
        1500
      );
    } else {
      window.setTimeout(
        () => setChat([{ text: "새로운 손님, 기분이 어때요?", loading: true }]),
        1500
      );
    }
  }, [LogInStore]);

  useEffect(() => {
    if (userSuccess) {
      window.setTimeout(
        () =>
          setChat(
            chat.map((each, i) =>
              i === chat.length - 1
                ? Object.assign(each, { loading: true })
                : each
            )
          ),
        1500
      );
    }
  }, [userSuccess]);

  useEffect(() => {
    if (chat.length % 2 === 0 && !showBtn) {
      window.setTimeout(() => {
        setChat([...chat, { text: "", loading: false }]);
        setBotSuccess(true);
      }, 1500);
    }
  }, [chat.length]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 7);
    if (botSuccess) {
      window.setTimeout(() => {
        setChat(
          chat.map((each, i) =>
            i === chat.length - 1
              ? Object.assign(each, {
                  text: `그럼 오늘 더 괜찮게 마무리하기 위해, ${festivals[randomIndex].title} 구경 갈까요?`,
                  loading: true,
                })
              : each
          )
        );
        setFestivalIndex(randomIndex);
        setShowBtn(true);
        setUserSuccess(false);
      }, 1500);
    }
  }, [botSuccess]);

  const handleChange = (e) => {
    if (chat.length % 2 === 1) {
      setText(e.target.value);
      setUserSuccess(false);
    }
  };
  const handleEnter = (input) => {
    setChat([...chat, { text: input, loading: false }]);
    setUserSuccess(true);
    setText("");
  };
  console.log(chat);

  return useObserver(() => (
    <Container>
      <ChatBox>
        <Head>
          <span>어디갈까봇</span>
        </Head>
        <Body>
          {chat.map((each, i) =>
            each.loading ? (
              <TextWrap left={i % 2 === 0} key={i}>
                <Profile
                  src={i % 2 === 0 ? chatBot : user}
                  left={i % 2 === 0}
                />
                <SpeechBubble>{each.text}</SpeechBubble>
              </TextWrap>
            ) : (
              <TextWrap left={i % 2 === 0} key={i}>
                <Profile
                  src={i % 2 === 0 ? chatBot : user}
                  left={i % 2 === 0}
                />
                <SpeechBubble>...</SpeechBubble>
              </TextWrap>
            )
          )}
          {showBtn && (
            <AnswerBtnWrap>
              <AnswerBtn
                id="click"
                onClick={(e) => {
                  e.target.id === "click" &&
                    history.push({
                      pathname: `/festivals/:${festivalIndex}`,
                      state: {
                        festival: festivals.find(
                          (each, i) => i === festivalIndex
                        ),
                      },
                    });
                }}
              >
                네
              </AnswerBtn>
              <AnswerBtn onClick={() => handleEnter("아니요")}>
                아니요
              </AnswerBtn>
            </AnswerBtnWrap>
          )}
        </Body>
        <Foot>
          <Input
            type="text"
            placeholder="무엇이 궁금하세요?"
            onChange={handleChange}
            value={text}
          />
          <Btn onClick={() => handleEnter(text)} />
        </Foot>
      </ChatBox>
    </Container>
  ));
};

export default ChatBot;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0 20px;
  height: calc(100vh - 68.8px);
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 50%;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 68.8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const Body = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 206.4px);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: #f2f2f2;
`;

const TextWrap = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 20px);
  padding: 10px;
  ${(props) =>
    props.left
      ? css`
          justify-content: flex-start;
        `
      : css`
          flex-direction: row-reverse;
        `}
`;
const Profile = styled.img`
  height: 40px;
  padding: 5px;
  border: 1px solid black;
  background-color: #fff;
  border-radius: 50%;
  ${(props) =>
    props.left
      ? css`
          margin-right: 10px;
        `
      : css`
          margin-left: 10px;
        `}
`;

const SpeechBubble = styled.div`
  padding: 7px 10px;
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const AnswerBtnWrap = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: center;
`;

const AnswerBtn = styled.button`
  padding: 10px 15px;
  margin: 10px;
  font-weight: bolder;
  outline: none;
  border: none;
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const Foot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 68.8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const Input = styled.input`
  width: 100%;
  padding: 20px;
  border: none;
  outline: none;
`;

const Btn = styled(FaRegPaperPlane)`
  height: 100%;
  font-size: 32px;
  margin-right: 20px;
  cursor: pointer;
`;
