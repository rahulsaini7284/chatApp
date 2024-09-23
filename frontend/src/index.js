// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
const root = ReactDOM.createRoot(document.getElementById("root"));
async function getId() {
  const { data } = await axios("/client_id");
  return data;
}
const client_id = await getId();

root.render(
  <GoogleOAuthProvider clientId={client_id}>
    <ChakraProvider cssVarsRoot="body">
      <Provider store={store}>
        <App />
        <ToastContainer
          progressClassName="toastProgress"
          bodyClassName="toastBody"
        />
      </Provider>
    </ChakraProvider>
  </GoogleOAuthProvider>
);
