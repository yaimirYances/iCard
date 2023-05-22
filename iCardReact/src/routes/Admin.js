import { Admin } from "../layouts";
import { home } from "../pages/Admin";

const routesAdmin = [
  {
    path: "/admin",
    layout: Admin,
    component: home,
  },
];
export default routesAdmin;
