import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import Theme from "./styles/Theme";
import "./index.css";
import { GlobalStyle } from "./styles/GlobalStyle.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme>
      <GlobalStyle />
        <App />
      </Theme>
    </Provider>
  </React.StrictMode>
);