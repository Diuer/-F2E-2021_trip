import React, { useEffect } from "react";

import SearchIcon from "@mui/icons-material/Search";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

import "./HeaderSearch.scss";
import requestAPI, { requesRestaurant } from "../../controller/apiManager";

const HeaderSearch = () => {
  useEffect(async () => {
    const data = await requesRestaurant("Taipei", {
      $top: 8,
      $filter: "contains(Address, '中正區')",
    });
    console.log(data);
  }, []);

  return (
    <div className="header-search">
      <div className="inner-container">
        <div className="search-item">
          <p className="title">
            <NotListedLocationIcon />
            位置
          </p>
          <input placeholder="想在哪裡吃飯？" />
        </div>
        <div className="search-item">
          <p className="title">
            <AccessTimeFilledIcon />
            時間
          </p>
          <input placeholder="選擇時間" />
        </div>
        <div className="search-icon">
          <SearchIcon htmlColor="#fff" />
        </div>
      </div>
    </div>
  );
};

export default HeaderSearch;
