import React, { useContext } from "react";
import "./Bars.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import { WindowSize } from "./../../Context/WindowContext";

export default function SideBar() {
  const menu = useContext(Menu);
  const isOpen = menu.isOpen;
  const windowSize = useContext(WindowSize);
  console.log(windowSize.windowSize);
  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
          display:
            windowSize.windowSize < "768"
              ? isOpen
                ? "block"
                : "none"
              : "none",
        }}
      ></div>

      <div
        className="side-bar"
        style={{
          left: windowSize.windowSize < "768" ? (isOpen ? "0" : "-220px") : "0",
          width: isOpen ? "220px" : "fit-content",
          position: windowSize.windowSize < "768" ? "fixed" : "sticky",
        }}
      >
        <NavLink
          to="users"
          className={"d-flex align-items-center gap-2 side-bar-link"}
        >
          <FontAwesomeIcon
            style={{
              padding: isOpen ? "10px 8 10px 15px" : "10px 8px",
            }}
            icon={faUsers}
          />
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
            Users
          </p>
        </NavLink>

        <NavLink
          to="/dashboard/users/add"
          className={"d-flex align-items-center gap-2 side-bar-link my-2"}
        >
          <FontAwesomeIcon
            style={{
              padding: isOpen ? "10px 8 10px 15px" : "10px 8px",
            }}
            icon={faPlus}
          />
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
            Add User
          </p>
        </NavLink>
      </div>
    </div>
  );
}
