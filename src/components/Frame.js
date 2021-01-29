import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Frame = ({ children }) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const setFrame = () => {
      if (window.innerHeight !== 0) {
        setHeight(window.innerHeight);
      }
    };

    window.addEventListener("resize", setFrame);
    return window.removeEventListener("resize", setFrame);
  }, []);

  return <BodyFrame height={height}>{children}</BodyFrame>;
};

export default Frame;

const BodyFrame = styled.div`
  display: flex;
  width: 100%;
  min-height: ${(props) => `${props.height}px`};
`;
