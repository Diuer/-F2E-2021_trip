import React, { useEffect } from "react";

import RoomIcon from "@mui/icons-material/Room";
import SearchIcon from "@mui/icons-material/Search";

import "./HeaderSearch.scss";
import requestAPI, { requesScenicSpot } from "../../../controller/apiManager";

const HeaderSearch = () => {
  useEffect(async () => {
    const data = await requesScenicSpot("Taipei", {
      $top: 8,
      $filter: "contains(Address, '中正區')",
    });
    console.log(data);
  }, []);

  return (
    <div className="header-search">
      <div className="inner-container">
        <div className="left">
          <p className="slogan">
            探索台灣
            <br />
            讓我們更親近這片土地
          </p>
          <p className="website-title">
            <RoomIcon className="icon" />
            台灣旅遊景點導覽
          </p>
        </div>
        <div className="right">
          <select className="search-kind">
            <option>探索景點</option>
            <option>節慶活動</option>
            <option>品嚐美食</option>
          </select>
          <input
            className="search-keyword"
            placeholder="你想去哪裡？請輸入關鍵字"
          />
          <div className="search-button">
            <SearchIcon className="icon" />
            搜尋
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSearch;
