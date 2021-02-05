import React from "react";
import styled from "styled-components";

const Agreement = () => {
  return (
    <>
      <Title>약관 동의</Title>
      <Container>
        <AllApplyWrap>
          <CheckBox type="checkbox" />
          <span>전체동의</span>
        </AllApplyWrap>
        <Wrap>
          <CheckBox type="checkbox" />
          <div>
            <span>만 14세 이상입니다.</span>
            <SmallText>(필수)</SmallText>
          </div>
        </Wrap>
        <Wrap>
          <CheckBox type="checkbox" />
          <div>
            <span>이용약관</span>
            <SmallText>(필수)</SmallText>
          </div>
        </Wrap>
        <Wrap>
          <CheckBox type="checkbox" />
          <div>
            <span>개인정보처리방침</span>
            <SmallText>(필수)</SmallText>
          </div>
        </Wrap>
        <Wrap>
          <CheckBox type="checkbox" />
          <div>
            <span>이벤트,알림 메일 및 SMS 수신</span>
            <SmallText>(선택)</SmallText>
          </div>
        </Wrap>
      </Container>
    </>
  );
};

export default Agreement;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(30% - 30px);
  padding: 20px 15px;
  margin: 10px 0;
  border: 1px solid #959494;
`;

const Title = styled.span``;

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
`;

const SmallText = styled.span`
  margin-left: 5px;
  font-size: 13px;
`;
