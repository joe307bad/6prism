import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { make } from "../lib/es6_global/src/rescript/Index.bs";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: make,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
