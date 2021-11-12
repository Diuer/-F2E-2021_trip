import React, { useCallback, useState } from "react";
import { useHistory } from "react-router";

import BookmarkIcon from "@mui/icons-material/Bookmark";

import menuIcon from "../../../assets/image/menu-mobile.png";

import "./TopNavigation.scss";
import { Link } from "react-router-dom";

const TopNavigation = () => {
  const history = useHistory();
  const [isMenuVisible, setMenuVisible] = useState(false);

  return (
    <div id="top-navigation">
      <div className="inner-container">
        <div className="logo" onClick={() => history.push("/")}></div>
        <img
          className="menu-icon"
          src={menuIcon}
          onClick={useCallback(
            () => setMenuVisible(!isMenuVisible),
            [isMenuVisible]
          )}
        />
        <ul>
          <Link to="/scenic-spot/search-result">探索景點</Link>
          <Link className="not-allowed" to="/">
            節慶活動
          </Link>
          <Link className="not-allowed" to="/">
            品嚐美食
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default TopNavigation;
