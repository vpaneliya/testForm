import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={`${import.meta.env.BASE_URL}`} element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
