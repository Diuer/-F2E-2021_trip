import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import qs from "querystring";

import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import defaultCardPicture from "../../assets/image/default-card-picture.png";
import noDataIcon from "../../assets/image/no-data.png";

import { CITY_OPTIONS } from "../../constants/city";
import requestAPI, { requesScenicSpot } from "../../controller/apiManager";

import "./SearchResult.scss";

const SearchResult = () => {
  const history = useHistory();
  const { searchKind = "scenic-spot" } = useParams();
  const loc = useLocation();
  const [searchCity, setSearchCity] = useState(
    qs.parse(loc.search.substring(1)).searchCity || ""
  );
  const [searchKeyword, setSearchKeyword] = useState(
    qs.parse(loc.search).searchKeyword
  );
  const [searchResult, setSearchResult] = useState([]);

  useEffect(async () => {
    console.log(loc.search, qs.parse(loc.search.substring(1)));
    if (searchKind === "scenic-spot") {
      const data = await requesScenicSpot(searchCity, {
        $filter: `contains(Name,'${searchKeyword}')`,
      });
      setSearchResult(data);
    }
  }, [loc]);

  const handleSearch = () => {
    history.push(
      `/scenic-spot/search-result?${qs.stringify({
        searchCity,
        searchKeyword,
      })}`
    );
  };

  return (
    <>
      <div className="search-result">
        <div className="inner-container">
          <div className="breadcrumb">
            <Link to="/">首頁</Link> / 探索景點
          </div>
          <div className="search-bar">
            <select
              className="search-kind"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            >
              <option value="">全部</option>
              {Object.keys(CITY_OPTIONS).map((cityKey) => (
                <option key={cityKey} value={cityKey}>
                  {CITY_OPTIONS[cityKey]}
                </option>
              ))}
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
          <div className="show-result">
            <p className="result-text">
              搜尋結果{" "}
              <span>
                共有<code>{searchResult.length}</code>筆
              </span>
            </p>
            <div className="card-container">
              {searchResult.length > 0 ? (
                searchResult.map((data) => (
                  <div
                    className="card"
                    key={data.ID}
                    onClick={() => history.push(`/scenic-spot/view/${data.ID}`)}
                  >
                    <img src={data.Picture.PictureUrl1 || defaultCardPicture} />
                    <p className="title">{data.Name}</p>
                    <div className="city-info">
                      <LocationOnOutlinedIcon className="icon" />
                      <span>{data.Address}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-data-container">
                  <img className="icon" src={noDataIcon} />
                  <p className="no-data-text">
                    目前查無資料
                    <br />
                    請重新搜尋
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResult;
