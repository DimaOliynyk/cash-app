import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { Provider } from 'react-redux'; // for Redux
import { store } from "./redux/store"; // путь к store.js
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"; // подключаем SW

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <Provider store={store}>        {/* оборачиваем Redux store */}
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);

// Регистрируем service worker
serviceWorkerRegistration.register();