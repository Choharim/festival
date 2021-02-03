import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";

const FastivalDetails = () => {
  let location = useLocation();
  let history = useHistory();

  return (
    <>
      {location.state === undefined ? (
        history.push("/")
      ) : (
        <div>{location.state.festival.title}</div>
      )}
    </>
  );
};

export default FastivalDetails;
