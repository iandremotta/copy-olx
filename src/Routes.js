import React from "react";
import { Switch } from "react-router-dom";
import RouteHandler from "./components/RouteHandler";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AdPage from "./pages/AdPage";
import AddAd from "./pages/AddAd";
import Ads from "./pages/Ads";
export default () => {
  return (
    <Switch>
      <RouteHandler exact path="/">
        <Home />
      </RouteHandler>
      <RouteHandler path="/about">
        <About />
      </RouteHandler>
      <RouteHandler exact path="/signin">
        <Signin />
      </RouteHandler>
      <RouteHandler exact path="/signup">
        <Signup />
      </RouteHandler>
      <RouteHandler path="/ad/:id">
        <AdPage />
      </RouteHandler>
      <RouteHandler private path="/post-an-ad">
        <AddAd />
      </RouteHandler>
      <RouteHandler exact path="/ads">
        <Ads />
      </RouteHandler>
      <RouteHandler>
        <NotFound />
      </RouteHandler>
    </Switch>
  );
};
