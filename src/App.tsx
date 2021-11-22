import { useRoutes } from "react-router-dom";
import { RouteObject } from "react-router";
import MainLayout from "./layout/MainLayout";
import Home from "./views/Home";
import Route404 from "./views/404";
import Wallet from "./views/Wallet";
import "./styles/styles.css";

const App = () => {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/wallet",
          element: <Wallet />,
        },
      ],
    },
    { path: "*", element: <Route404 /> },
  ];

  const elements = useRoutes(routes);

  return elements;
};

export default App;
