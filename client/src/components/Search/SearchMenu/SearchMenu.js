import { useRef, useState } from "react";
import { ReturnIcon, SearchIcon } from "../../../svg";
import CustomInput from "../../input/CustomInput";
import styles from "./SearchMenu.module.css";

function SearchMenu({showSearchMenu, setShowSearchMenu}) {
  const input = useRef(null);
  const [iconVisible, setIconVisible] = useState(true);

  return (
    <div className={`${styles.SearchMenu_container} ${styles.left}`}>
          <div className={styles.SearchMenu_wrap}>
        <div
          className="hover1"
          onClick={() => {
            setShowSearchMenu(false);
          }}
        >
          <ReturnIcon color={"#65676b"} />
        </div>
        <div
          className={styles.search}
          onClick={() => {
            input.current.focus();
          }}
        >
          {iconVisible && (
            <div>
              <SearchIcon color={"#65676b"} />
            </div>
          )}
          <CustomInput
             className="search-input"
             type="text"
             placeholder="Search in ZIWIBook"
            innerRef={input}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchMenu;
