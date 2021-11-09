import React from "react";

import BookmarkIcon from "@mui/icons-material/Bookmark";

import "./Footer.scss";

const Footer = () => {
  return (
    <div id="footer">
      <div className="inner-container">
        <div className="top">
          <span className="website-title">eat right now</span>
          <span>關於我們</span>
          <span>客戶服務</span>
          <span>搜尋鄰近區域美食</span>
          <span>前往已收藏餐廳</span>
        </div>
        <hr />
        <span className="copyright">
          本網站受到 reCAPTCHA 和 Google 隱私政策的保護，且適用服務條款。
        </span>
      </div>
    </div>
  );
};

export default Footer;
