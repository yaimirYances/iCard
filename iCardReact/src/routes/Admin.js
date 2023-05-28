import { Admin } from "../layouts";
import {
  AdminHome,
  UsersAdmin,
  CategoriesAdmin,
  ProductAdmin,
} from "../pages/Admin";

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
  {
    path: "/admin/categories",
    layout: Admin,
    component: CategoriesAdmin,
  },
  {
    path: "/admin/products",
    layout: Admin,
    component: ProductAdmin,
  },
];
export default routesAdmin;
