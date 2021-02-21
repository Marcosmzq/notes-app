import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { AuthContext } from "../context/auth";

import Home from "../components/Home";

const Inicio = () => {
  const { user } = useContext(AuthContext);

  return <>{user ? <Home /> : <Redirect to="/iniciar-sesion" />}</>;
};

export default Inicio;
