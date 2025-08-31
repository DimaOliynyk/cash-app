import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux'; 
import { store } from "./redux/store"; 

import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"; 

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <Provider store={store}>        
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);

serviceWorkerRegistration.register();