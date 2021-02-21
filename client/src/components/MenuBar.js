import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import { AuthContext } from "../context/auth";

const MenuBar = () => {
  const { user, cerrarSesion } = useContext(AuthContext);

  const pathname = window.location.pathname;

  const path = () => {

    if (pathname === "/") {
      return "Notes App";

    } else if (pathname.substr(1) === "iniciar-sesion") {
      return "Iniciar sesion";

    } else if (pathname.substr(1) === "crear-cuenta") {
      return "Crear una nueva cuenta";

    } else {
      return "";
    }
  };
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={user.username} active as={Link} to="/"></Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item name="Cerrar sesion" onClick={cerrarSesion}>
          <div style={{ color: "red" }}>Cerrar sesion</div>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="Notes App"
        active={activeItem === "Notes App"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      >
        Notes App
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item
          name="Crear una nueva cuenta"
          active={activeItem === "Crear una nueva cuenta"}
          onClick={handleItemClick}
          as={Link}
          to="/crear-cuenta"
        >
          Crear una nueva cuenta
        </Menu.Item>

        <Menu.Item
          name="Iniciar sesion"
          active={activeItem === "Iniciar sesion"}
          onClick={handleItemClick}
          as={Link}
          to="/iniciar-sesion"
        >
          Iniciar sesion
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
  
  return menuBar;
};

export default MenuBar;
