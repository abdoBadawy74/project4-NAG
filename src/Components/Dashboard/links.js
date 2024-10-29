import {
  faCartShopping,
  faMarker,
  faPlus,
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
    name: "Writer",
    path: "/dashboard/writer",
    icon: faMarker,
  },
];
