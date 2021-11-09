import React from "react";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ShareIcon from "@mui/icons-material/Share";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import NavigationIcon from "@mui/icons-material/Navigation";
import PhoneIcon from "@mui/icons-material/Phone";

import "./HeaderInfo.scss";

const ActionButton = ({ icon }) => {
  return <div className="action-button">{React.createElement(icon)}</div>;
};

const HeaderInfo = () => {
  return (
    <div className="header-info">
      <div className="inner-container">
        <div className="info-bar">
          <KeyboardArrowLeftIcon htmlColor="#fff" />
          <span>RESTAURANT餐廳名稱</span>
        </div>
        <div className="action-button-container">
          <ActionButton icon={ShareIcon} />
          <ActionButton icon={TurnedInNotIcon} />
          <ActionButton icon={NavigationIcon} />
          <div className="action-button special">
            <PhoneIcon />
            電話預訂
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderInfo;
