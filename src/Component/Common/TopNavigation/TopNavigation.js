import React from "react";

import BookmarkIcon from "@mui/icons-material/Bookmark";

import "./TopNavigation.scss";

const TopNavigation = () => {
  return (
    <div id="top-navigation">
      <div className="inner-container">
        <span className="website-title">eat right now</span>
        <BookmarkIcon htmlColor="#fff" />
      </div>
    </div>
  );
};

export default TopNavigation;
