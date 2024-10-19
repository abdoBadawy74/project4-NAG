import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { Axios } from "../../Api/axios";
import { LOGOUT, USER } from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Logout from "./../../Pages/Auth/Logout";

export default function TopBar() {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((res) => {
        console.log(res.data);
        setName(res.data.name);
      })
      .catch((err) => {
        navigate("/login", { replace: true });
      });
  }, []);

  async function handleLogout() {
    try {
      const res = await Axios.get(`/${LOGOUT}`);
      window.location.pathname = "/login";
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="top-bar d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-5">
        <h3>E-commerce</h3>
        <FontAwesomeIcon
          onClick={() => setIsOpen((prev) => !prev)}
          cursor={"pointer"}
          icon={faBars}
        />
      </div>
      <DropdownButton id="dropdown-basic-button" title={name}>
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </DropdownButton>
    </div>
  );
}
