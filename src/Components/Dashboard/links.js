import { faMarker, faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";

export const links =[
    {
        name:"Users",
        path:"users",
        icon: faUsers,
    },
    {
        name:"Add User",
        path:"/dashboard/users/add",
        icon: faPlus,
    },
    {
        name:"Writer",
        path:"/dashboard/writer",
        icon: faMarker,
    },
]