import React from "react";
import ReactDOM from "react-dom";
import { useObservable } from "react-use";

import userTime$ from "./streams/userTime";

import Clock from "./components/Clock";
import PreferencesPanel from "./components/PreferencesPanel";

import { AppContainer, AppLoader } from "./app.styles";

const App = () => {
  const time = useObservable(userTime$);

  return (
    <AppContainer>
      {time ? (
        <>
          <Clock />
          <PreferencesPanel />
        </>
      ) : (
        <AppLoader />
      )}
    </AppContainer>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
