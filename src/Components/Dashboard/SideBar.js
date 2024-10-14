import React, { useContext } from "react";
import "./Bars.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import { WindowSize } from "./../../Context/WindowContext";

export default function SideBar() {
  const menu = useContext(Menu);
  const isOpen = menu.isOpen;
  const windowSize = useContext(WindowSize);
  console.log(windowSize.windowSize);
  return (
    <div
      className="side-bar"
      style={{
        left: windowSize.windowSize < "768" ? (isOpen ? "0" : "-220px") : "0",
        width: isOpen ? "220px" : "fit-content",
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
    </div>
  );
}
