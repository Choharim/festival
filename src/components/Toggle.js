import React, { useState } from "react";
import styled, { css } from "styled-components";
import { IoIosArrowUp } from "react-icons/io";

const Toggle = ({ children }) => {
  const [show, setShow] = useState(false);

  return (
    <Container>
      <UpBtn onClick={() => setShow(!show)} show={show ? "up" : "down"} />
      {show && children}
    </Container>
  );
};

export default Toggle;

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const UpBtn = styled(IoIosArrowUp)`
  position: absolute;
  right: 0;
  top: -20px;
  font-size: 23px;
  color: #493c3b;
  ${(props) =>
    props.show === "up"
      ? css`
          transform: rotate(360deg);
        `
      : props.show === "down"
      ? css`
          transform: rotate(180deg);
        `
      : null}
  cursor: pointer;
`;
