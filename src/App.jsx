import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "./Routes";
import React from "react";
import { ToastContainer } from "./components/Notifications/Notifications.component";
function App() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<>loading...</>}>
        <ToastContainer />
        <AppRoutes />
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
