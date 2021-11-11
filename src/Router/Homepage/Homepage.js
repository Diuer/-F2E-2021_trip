import React, { useEffect, useState } from "react";

import { HeaderSearch } from "../../Component/Common/Header";
import { Slider } from "../../Component/Common/Slider";
import requestAPI, { requesScenicSpot } from "../../controller/apiManager";

import "./Homepage.scss";

const Homepage = () => {
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
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
      });
    }
  }, []);

  return (
    <>
      <HeaderSearch />
      <Slider sliderData={sliderData} needRedirect />
    </>
  );
};

export default Homepage;
