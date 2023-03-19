import PulseLoader from "react-spinners/PulseLoader";
import BeatLoader from "react-spinners/BeatLoader";
import "./index.css";

const FormLoader = ({ loading, children, type }) => {
  return (
    <div className={loading ? "Loader-wrap" : ""}>
      {loading ? <div className="loaderback" /> : ""}
      {loading ? (
        <div className="loader">
          {type === 2 ? (
            <PulseLoader
              color="#878787"
              loading={loading}
              size={10}
            />
          ) : (
            <BeatLoader
              color=" #5c6e58"
              loading={loading}
              size={20}
            />
          )}
        </div>
      ) : (
        ""
      )}
      <div className={loading ? "loader-content" : ""}>
        {children}
      </div>
    </div>
  );
};

export default FormLoader;
