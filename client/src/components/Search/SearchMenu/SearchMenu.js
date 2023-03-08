import { useRef, useState } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { ReturnIcon, SearchIcon } from "../../../svg";
import CustomInput from "../../input/CustomInput";
import styles from "./SearchMenu.module.css";

function SearchMenu({ showSearchMenu, setShowSearchMenu }) {
  const input = useRef(null);
  const searchMenu = useRef(null);
  const [iconVisible, setIconVisible] = useState(true);
  useOnClickOutside(searchMenu, showSearchMenu, () => {
    setShowSearchMenu(false);
  });
  
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
          />
        </div>
      </div>
    </div>
  );
}

export default SearchMenu;
