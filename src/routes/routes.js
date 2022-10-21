import Chat from "../pages/Chat";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { CHAT_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from "./consts";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    component: <Login />,
  },
  {
    path: REGISTER_ROUTE,
    component: <Register/>
  }
];
export const privateRoutes = [
  {
    path: CHAT_ROUTE,
    component: <Chat />,
  },
];
