import routesAdmin from "./Admin";
import routesClient from "./Client";
import { Error404 } from "../pages";
import { Basic } from "../layouts";

//const routes = [routesAdmin, routesClient];
const routes = [
  ...routesAdmin,
  ...routesClient,
  {
    path: "*",
    layout: Basic,
    component: Error404,
  },
];
export default routes;
