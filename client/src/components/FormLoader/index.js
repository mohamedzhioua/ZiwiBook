import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import BeatLoader from "react-spinners/BeatLoader";

import styles from "./index.css";
const FormLoader = ({ loading, children, className ,type }) => {
  return (
    <div className={loading ? styles.wrap : ""}>
      <div className={styles.Loader}>
      {type === 2 ? (
            <PulseLoader color="#878787" loading={loading} size={10} />
          ) : (
            <BeatLoader color="#1876f2" loading={loading} size={20} />
          )}
      </div>
      <div className={`${loading ? styles.content : ""} ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default FormLoader;
