import ReactDOM from "react-dom/client";
import { Provider } from "mobx-react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./sass/index.scss";

import { Home } from "./app/providers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path={"*"} element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
