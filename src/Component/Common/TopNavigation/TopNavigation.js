import React from "react";
import { useHistory } from "react-router";

import BookmarkIcon from "@mui/icons-material/Bookmark";

import logoDesktop from "../../../assets/image/logo-desktop.png";

import "./TopNavigation.scss";

const TopNavigation = () => {
  const history = useHistory();

  return (
    <div id="top-navigation">
      <div className="inner-container">
        <div className="logo" onClick={() => history.push("/")}></div>
        <ul>
          <li>探索景點</li>
          <li>節慶活動</li>
          <li>品嚐美食</li>
        </ul>
      </div>
    </div>
  );
};

export default TopNavigation;
