import { Link } from "react-router-dom";
import classe from "./profileMenu.module.css";

function ProfileMenu() {
  return (
    <div className={classe.profile_menu_container}>
      <div className={classe.profile_menu}>
        <Link to="#" className={`${classe.link} ${classe.active}`}>
          Posts
        </Link>
        <Link to="#" className={`${classe.link} hover1`}>
          About
        </Link>
        <Link to="#" className={`${classe.link} hover1`}>
          Friends
        </Link>
        <Link to="#" className={`${classe.link} hover1`}>
          Photos
        </Link>
      </div>
    </div>
  );
}

export default ProfileMenu;
