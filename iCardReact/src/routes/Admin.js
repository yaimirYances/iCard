import { Admin } from "../layouts";
import { AdminHome, UsersAdmin } from "../pages/Admin";

const routesAdmin = [
  {
    path: "/admin",
    layout: Admin,
    component: AdminHome,
  },
  {
    path: "/admin/users",
    layout: Admin,
    component: UsersAdmin,
  },
];
export default routesAdmin;
