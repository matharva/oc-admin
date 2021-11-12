/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "pages/Dashboard.js";
import Profile from "pages/Profile.js";
import Maps from "pages/Maps.js";
import Register from "pages/Register.js";
import Login from "pages/Login.js";
import Tables from "pages/Tables.js";
import Icons from "pages/Icons.js";
import Chat from "pages/Chat";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/notifs",
    name: "Notification",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/event-details",
    name: "Event Details",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/chats",
    name: "Chats",
    icon: "ni ni-bullet-list-67 text-red",
    component: Chat,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
];
export default routes;
