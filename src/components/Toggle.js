import React, { useState } from "react";
import styled, { css } from "styled-components";
import { IoIosArrowUp } from "react-icons/io";

const Toggle = ({ children }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Container>
        <UpBtn onClick={() => setShow(!show)} show={show ? "up" : "down"} />
      </Container>
      {show && children}
    </>
  );
};

export default Toggle;

const Container = styled.div`
  position: relative;
  display: flex;
  width: 90%;
`;

const UpBtn = styled(IoIosArrowUp)`
  position: absolute;
  right: 0;
  top: -50px;
  margin-left: 15px;
  font-size: 1.2rem;
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
