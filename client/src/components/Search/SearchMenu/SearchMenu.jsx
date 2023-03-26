import * as React from "react";
import { useSearchMutation } from "../../../app/features/search/searchApi";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { ReturnIcon, SearchIcon } from "../../../assets/svg";
import CustomInput from "../../input/CustomInput";
import styles from "./SearchMenu.module.css";
import { Link } from "react-router-dom";

function SearchMenu({ showSearchMenu, setShowSearchMenu }) {
  const input = React.useRef(null);
  const searchMenu = React.useRef(null);
  const [iconVisible, setIconVisible] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedTerm, setDebouncedTerm] = React.useState(searchTerm);
  const [Search, { data, isLoading, isError, isSuccess }] = useSearchMutation();
  useOnClickOutside(searchMenu, showSearchMenu, () => {
    setShowSearchMenu(false);
  });
  React.useEffect(() => {
    input.current.focus();
  }, []);
  React.useEffect(() => {
    const timer = setTimeout(() => setSearchTerm(debouncedTerm), 1000);
    return () => clearTimeout(timer);
  }, [debouncedTerm]);

  React.useEffect(() => {
    if (searchTerm.trim().length > 0) {
      Search({ term: searchTerm });
    }
  }, [searchTerm]);
  return (
    <div className={styles.SearchMenu_container} ref={searchMenu}>
      <div className={styles.SearchMenu_wrap}>
        <div
          className="hover1"
          onClick={() => {
            setShowSearchMenu(false);
          }}
        >
          <ReturnIcon color={"#5c6e58"} />
        </div>
        <div
          className={styles.search}
          onClick={() => {
            input.current.focus();
          }}
        >
          {iconVisible && (
            <div>
              <SearchIcon color={"#5c6e58"} />
            </div>
          )}
          <CustomInput
            className={styles.search_input}
            type="text"
            placeholder="Search in ZIWIBook"
            innerRef={input}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
            onChange={(e) => setDebouncedTerm(e.target.value)}
            value={debouncedTerm}
          />
        </div>
      </div>
      <div className="scrollbar" style={{ height: "100%" }}>
        <div className={`${styles.search_results} scrollbar`}>
          {!isLoading &&
            isSuccess &&
            data.length > 0 &&
            searchTerm.trim().length > 0 ? (
            data?.map((user) => (
              <Link
                to={`/profile/${user.username}`}
                className={`${styles.search_item} hover2`}
                onClick={() => {
                  setDebouncedTerm("");
                }}
                key={user._id}
              >
                <div className={`${styles.search_result}`}>
                  <div>
                    <img
                      className={styles.search_result_img}
                      src={user.photo}
                      alt=""
                    />
                  </div>
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </div>
              </Link>
            ))
          ) : searchTerm ? (
            <p style={{ padding: "10px" }}>No Search Results</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchMenu;
