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

// https://keycloak.six.prism/auth/realms/six.prism/protocol/openid-connect/auth?scope=openid%20email%20profile&client_id=six.prism.dashboard&redirect_uri=http%3A%2F%2Flocalhost%3A8080&response_type=code

// https://keycloak.six.prism/auth/realms/six.prism/protocol/openid-connect/logout

// http://localhost:8080/?session_state=c4fd0235-ac56-49fc-b568-f7ab271a43e8&code=efa5e8be-d32b-4e93-b053-a407dc5d0227.c4fd0235-ac56-49fc-b568-f7ab271a43e8.a4511fcc-1474-4fee-b893-664122d7d0b8

// https://www.appsdeveloperblog.com/keycloak-authorization-code-grant-example/