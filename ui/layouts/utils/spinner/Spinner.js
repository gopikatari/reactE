import React from "react";
import spinner from "../../../assets/spinner.gif";

const Spinner = () => {
  return (
    <React.Fragment>
      <img
        src={spinner}
        alt=""
        className="flex flex-column align-items-center justify-content-center text-center d-block m-auto h-100"
      />
    </React.Fragment>
  );
};

export default Spinner;
