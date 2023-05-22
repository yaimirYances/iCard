import { Client } from "../layouts";
import { home } from "../pages/Client";

const routesClient = [
  {
    path: "/",
    layout: Client,
    component: home,
  },
];
export default routesClient;
