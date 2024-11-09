import {
  faCartShopping,
  faMarker,
  faPlus,
  faTruckFast,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export const links = [
  {
    name: "Users",
    path: "users",
    icon: faUsers,
  },
  {
    name: "Add User",
    path: "/dashboard/users/add",
    icon: faPlus,
  },
  {
    name: "Categories",
    path: "/dashboard/categories",
    icon: faCartShopping,
  },
  {
    name: "Add Category",
    path: "/dashboard/category/add",
    icon: faPlus,
  },
  {
    name: "Products",
    path: "/dashboard/products",
    icon: faTruckFast,
  },
  {
    name: "Add Product",
    path: "/dashboard/Product/add",
    icon: faPlus,
  },
  {
    name: "Writer",
    path: "/dashboard/writer",
    icon: faMarker,
  },
];
