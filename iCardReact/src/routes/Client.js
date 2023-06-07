import { Basic, Client } from "../layouts";
import {
  SelectTable,
  Categories,
  Product,
  Cart,
  OrdersHistory,
} from "../pages/Client";

const routesClient = [
  {
    path: "/",
    layout: Basic,
    component: SelectTable,
  },
  {
    path: "/client/:tableNumber",
    layout: Client,
    component: Categories,
  },
  {
    path: "/client/:tableNumber/cart",
    layout: Client,
    component: Cart,
  },
  {
    path: "/client/:tableNumber/orders",
    layout: Client,
    component: OrdersHistory,
  },
  {
    path: "/client/:tableNumber/:idCategory/:category",
    layout: Client,
    component: Product,
  },
];
export default routesClient;
