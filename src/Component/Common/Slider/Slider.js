import React, { useEffect, useState, useCallback } from "react";
import cn from "clsx";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import "./Slider.scss";
import { useHistory } from "react-router";

const Slider = ({ sliderData = [], needRedirect = false }) => {
  const history = useHistory();
  const [nowIndex, setNowIndex] = useState(0);

  const handlePrev = useCallback(() => {
    setNowIndex(nowIndex === 0 ? sliderData.length - 1 : nowIndex - 1);
  }, [sliderData, nowIndex]);

  const handleNext = useCallback(() => {
    setNowIndex(nowIndex < sliderData.length - 1 ? nowIndex + 1 : 0);
  }, [sliderData, nowIndex]);

  return (
    <div id="slider-container">
      {sliderData.length > 0 && (
        <div className="inner-container">
          <p className="title">
            {sliderData[nowIndex].City} | {sliderData[nowIndex].Name}
          </p>
          <ChevronLeftIcon className="icon" onClick={handlePrev} />
          <img
            // ref={refSlider}
            className={cn("slider", { link: needRedirect })}
            src={sliderData[nowIndex].Picture.PictureUrl1}
            onClick={() => {
              if (needRedirect) {
                history.push(`/scenic-spot/view/${sliderData[nowIndex].ID}`);
              }
            }}
          />
          <ChevronRightIcon className="icon" onClick={handleNext} />
          <div className="slider-dots">
            {sliderData.map((_, index) => (
              <FiberManualRecordIcon
                key={index}
                className={cn("slider-dot", { active: index === nowIndex })}
                onClick={() => setNowIndex(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider;
