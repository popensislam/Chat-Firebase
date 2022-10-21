import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import { privateRoutes, publicRoutes } from "./routes";

const AppRouter = ({ currentUser }) => {
  return (  
    <Routes>
      {publicRoutes.map((route) => (
        <Route path={route.path} element={route.component} key={route.path} />
      ))}
      {currentUser &&
        privateRoutes.map((route) => (
          <Route path={route.path} element={route.component} key={route.path} />
        ))}
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;
