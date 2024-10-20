import React, { useContext, useState, useEffect } from "react";
import "./Bars.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import { WindowSize } from "./../../Context/WindowContext";
import { USER } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import { links } from "./links";

export default function SideBar() {
  const menu = useContext(Menu);
  const isOpen = menu.isOpen;
  const windowSize = useContext(WindowSize);
  console.log(windowSize.windowSize);

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        navigate("/login", { replace: true });
      });
  }, []);

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
        {links.map((link,key) => {
          return (
            <NavLink
              key={key}
              to={link.path}
              className={"d-flex align-items-center gap-2 side-bar-link my-3"}
            >
              <FontAwesomeIcon
                style={{
                  padding: isOpen ? "10px 8 10px 15px" : "10px 8px",
                }}
                icon={link.icon}
              />
              <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
                {link.name}
              </p>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
