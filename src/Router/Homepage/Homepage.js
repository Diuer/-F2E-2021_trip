import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import { HeaderSearch } from "../../Component/Common/Header";
import { Slider } from "../../Component/Common/Slider";
import requestAPI, { requesScenicSpot } from "../../controller/apiManager";

import "./Homepage.scss";

const Homepage = () => {
  const history = useHistory();
  const [sliderData, setSliderData] = useState(false);
  const [hotList, setHotList] = useState([]);

  useEffect(async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          // console.log(coords, coords.longitude, coords.latitude);
          const nearby = await requesScenicSpot("", {
            $top: 6,
            $select: "ID,City,Name,Picture,Position",
            $spatialFilter: `nearby(${coords.latitude},${coords.longitude},5000)`,
            $filter: "Picture/PictureUrl1 ne null",
          });
          console.log("nearby me", nearby);
          nearby.City = nearby.City || nearby.Address?.substr(0, 3);
          setSliderData(nearby);
        },
        async () => {
          setSliderData(false);
        }
      );
    }

    /* 取得該縣市其他景點資訊 */
    const hotList = await requesScenicSpot("", {
      $filter: "Picture/PictureUrl1 ne null",
      $orderby: "Keyword desc",
      $format: "JSON",
      $skip: Math.floor(Math.random() * (100 - 4 + 1) + 4),
      $top: 4,
    });
    setHotList(hotList);
  }, []);

  return (
    <>
      <HeaderSearch />
      {sliderData && <Slider sliderData={sliderData} needRedirect />}
      <div className="homepage-container inner-container">
        {hotList.length > 0 && (
          <div className="hot-container">
            <p className="title">
              <span>熱門景點</span>
              <span
                className="more-text"
                onClick={() => history.push("/senic-spot/search-result")}
              >
                更多熱門景點
                <ChevronRightOutlinedIcon className="icon" />
              </span>
            </p>
            <div className="card-container">
              {hotList.map((data) => (
                <div
                  className="card"
                  key={data.ID}
                  onClick={() => history.push(`/scenic-spot/view/${data.ID}`)}
                >
                  <img src={data.Picture.PictureUrl1 || defaultCardPicture} />
                  <p className="title">{data.Name}</p>
                  <div className="city-info">
                    <LocationOnOutlinedIcon className="icon" />
                    <span>{data.Address || data.City}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Homepage;
