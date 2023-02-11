import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import BeatLoader from "react-spinners/BeatLoader";
import "./index.css";

const FormLoader = ({ loading, children ,type }) => {
console.log("🚀 ~ file: index.js:7 ~ FormLoader ~ loading", loading)

  return (
    <div className={Boolean(loading==="Loading") ? "wrap" : ""}>
      <div className="Loader">
      {type === 2 ? (
            <PulseLoader color="#878787"   loading={Boolean(loading==="Loading")} size={20} />
            ) : (
              <BeatLoader color="#1876f2"   loading={Boolean(loading==="Loading")} size={20} />
              )}
      </div>
      <div className={Boolean(loading==="Loading") ? "loader-content" : ""}>
        {children}
      </div>
    </div>
  );
};

export default FormLoader;
