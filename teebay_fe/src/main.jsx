import store from "./redux/app/store";
import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./app.jsx";
import client from "./apollo/apolloClient";
import { AuthProvider } from "./context/authContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <BrowserRouter>
          <Provider store={store}>
            <Routes>
              <Route
                path="/*"
                element={<App/>}
              />
            </Routes>
          </Provider>
        </BrowserRouter>

        <ToastContainer />
      </React.StrictMode>
    </ApolloProvider>
  </AuthProvider>
);
