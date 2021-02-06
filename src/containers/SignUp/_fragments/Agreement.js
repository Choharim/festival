import React, { useState } from "react";
import styled, { css } from "styled-components";

const Agreement = ({ agreement, setAgreement }) => {
  const [warningfirst, setWarningFirst] = useState(false);
  const [warningsecond, setWarningSecond] = useState(false);
  const [warningthird, setWarningThird] = useState(false);

  const hadleChange = (input) => (e) => {
    if (agreement.length === 4 && input === "all") {
      setAgreement([]);
    } else if (input === "all") {
      setAgreement([...Array(4).keys()]);
    } else {
      if (agreement.some((each) => each === input)) {
        setAgreement(agreement.filter((each) => each !== input));
        if (input === 0) {
          setWarningFirst(true);
        } else if (input === 1) {
          setWarningSecond(true);
        } else {
          setWarningThird(true);
        }
      } else {
        setAgreement([...agreement, input]);
      }
    }
  };

  return (
    <>
      <Title
        warning={
          (agreement.every((each) => each !== 0) ||
            agreement.every((each) => each !== 1) ||
            agreement.every((each) => each !== 2)) &&
          (warningfirst || warningsecond || warningthird)
        }
      >
        약관 동의
      </Title>
      <Container>
        <AllApplyWrap>
          <CheckBox
            type="checkbox"
            onChange={hadleChange("all")}
            checked={agreement.length === 4}
          />
          <span>전체동의</span>
        </AllApplyWrap>
        <Wrap>
          <CheckBox
            type="checkbox"
            onChange={hadleChange(0)}
            checked={agreement.some((each) => each === 0)}
            warning={agreement.every((each) => each !== 0) && warningfirst}
          />
          <div>
            <span>만 14세 이상입니다.</span>
            <SmallText>(필수)</SmallText>
          </div>
        </Wrap>
        <Wrap>
          <CheckBox
            type="checkbox"
            onChange={hadleChange(1)}
            checked={agreement.some((each) => each === 1)}
            warning={agreement.every((each) => each !== 1) && warningsecond}
          />
          <div>
            <span>이용약관</span>
            <SmallText>(필수)</SmallText>
          </div>
        </Wrap>
        <Wrap>
          <CheckBox
            type="checkbox"
            onChange={hadleChange(2)}
            checked={agreement.some((each) => each === 2)}
            warning={agreement.every((each) => each !== 2) && warningthird}
          />
          <div>
            <span>개인정보처리방침</span>
            <SmallText>(필수)</SmallText>
          </div>
        </Wrap>
        <Wrap>
          <CheckBox
            type="checkbox"
            onChange={hadleChange(3)}
            checked={agreement.some((each) => each === 3)}
          />
          <div>
            <span>이벤트,알림 메일 및 SMS 수신</span>
            <SmallText style={{ color: "black" }}>(선택)</SmallText>
          </div>
        </Wrap>
      </Container>
      {(agreement.every((each) => each !== 0) ||
        agreement.every((each) => each !== 1) ||
        agreement.every((each) => each !== 2)) &&
        (warningfirst || warningsecond || warningthird) && (
          <SmallText>필수 동의 항목입니다</SmallText>
        )}
    </>
  );
};

export default Agreement;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 30px);
  padding: 20px 15px;
  margin: 5px 0;
  border: 1px solid #959494;
`;

const Title = styled.span`
  ${(props) =>
    props.warning &&
    css`
      color: #ff7777;
    `}
`;

const Wrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const AllApplyWrap = styled(Wrap)`
  padding-bottom: 10px;
  border-bottom: 1px solid #959494;
`;

const CheckBox = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 10px;
  ${(props) =>
    props.warning &&
    css`
      box-shadow: #ff7777 0px 1px 3px 0px, #ff7777 0px 0px 0px 1px;
    `}
`;

const SmallText = styled.span`
  margin-left: 5px;
  font-size: 13px;
  color: #ff7777;
`;
