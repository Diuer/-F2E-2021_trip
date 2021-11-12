import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import qs from "querystring";

import RoomIcon from "@mui/icons-material/Room";
import SearchIcon from "@mui/icons-material/Search";

import requestAPI, { requesScenicSpot } from "../../../controller/apiManager";

import "./HeaderSearch.scss";

const HeaderSearch = () => {
  const history = useHistory();
  const [searchKind, setSearchKind] = useState("探索景點");
  const [searchKeyword, setSearchKeyword] = useState();

  useEffect(async () => {
    // const data = await requesScenicSpot("Taipei", {
    //   $top: 8,
    //   $filter: "contains(Address, '中正區')",
    // });
    // console.log(data);
  }, []);

  const handleSearch = () => {
    history.push(
      `/scenic-spot/search-result?${qs.stringify({
        searchKind,
        searchKeyword,
      })}`
    );
  };

  return (
    <div className="header-search">
      <div className="inner-container">
        <div className="left">
          <p className="slogan">
            探索<span className="highlight">台灣之美</span>
            <br />
            讓我們更親近這片土地
          </p>
          <p className="website-title">
            <RoomIcon className="icon" />
            台灣旅遊景點導覽
          </p>
        </div>
        <div className="right">
          <select
            className="search-kind"
            value={searchKind}
            onChange={(e) => setSearchKind(e.target.value)}
          >
            <option>探索景點</option>
            {/* <option>節慶活動</option>
            <option>品嚐美食</option> */}
          </select>
          <input
            className="search-keyword"
            placeholder="你想去哪裡？請輸入關鍵字"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <div className="search-button" onClick={handleSearch}>
            <SearchIcon className="icon" />
            搜尋
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSearch;
