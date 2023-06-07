import { Admin } from "../layouts";
import {
  OrdersAdmin,
  UsersAdmin,
  CategoriesAdmin,
  ProductAdmin,
  TablesAdmin,
  TableDetails,
  PaymentHistory,
} from "../pages/Admin";

const routesAdmin = [
  {
    path: "/admin",
    layout: Admin,
    component: OrdersAdmin,
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
  {
    path: "/admin/tables",
    layout: Admin,
    component: TablesAdmin,
  },
  {
    path: "/admin/table/:id",
    layout: Admin,
    component: TableDetails,
  },
  {
    path: "/admin/payments-history",
    layout: Admin,
    component: PaymentHistory,
  },
];
export default routesAdmin;
