import React, { useLayoutEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "normalize.css";
import "@fontsource/inter";
import "./style.scss";

import { TopNavigation } from "./Common/TopNavigation";
import { Footer } from "./Common/Footer";
import { HeaderSearch, HeaderInfo } from "./Common/Header";
import { requesRestaurant } from "./controller/apiManager";

const App = () => {
  useLayoutEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        console.log(coords, coords.longitude, coords.latitude);
        const nearby = await requesRestaurant("", {
          $spatialFilter: `nearby(${coords.latitude},${coords.longitude},5000)`,
        });
        console.log("nearby me", nearby);
      });
    }
  }, []);

  return (
    <>
      <TopNavigation />
      <HeaderSearch />
      <HeaderInfo />
      <Router>
        <Switch></Switch>
      </Router>
      <Footer />
    </>
  );
};

export default App;
