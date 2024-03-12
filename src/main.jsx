import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./HomePage.jsx";
import ErrorNotFound from "./components/ErrorNotFound.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import Register from "./components/Register.jsx";
import App from "./App";
import { FirebaseAuthWrapper } from "./firebase/FirebaseAuthWrapper.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorNotFound />,
  },
  {
    path: "/reset_password",
    element: <ResetPassword />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <FirebaseAuthWrapper>
        <App />
      </FirebaseAuthWrapper>
    ),
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
