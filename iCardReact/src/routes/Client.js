import { Client } from "../layouts";
import { ClienteHome } from "../pages/Client";

const routesClient = [
  {
    path: "/",
    layout: Client,
    component: ClienteHome,
  },
];
export default routesClient;
