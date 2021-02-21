import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./app.css";

import {AuthProvider} from './context/auth'
import AuthRoute from "./util/authRoute"

import MenuBar from "./components/MenuBar";
import Inicio from "./pages/Inicio";
import IniciarSesion from "./pages/IniciarSesion";
import CrearCuenta from "./pages/CrearCuenta";

function App() {
  return (
    <AuthProvider>
      <Router>
      <Container>
        <MenuBar />
        <Route exact path="/" component={Inicio} />
        <AuthRoute exact path="/crear-cuenta" component={CrearCuenta} />
        <AuthRoute exact path="/iniciar-sesion" component={IniciarSesion} />
      </Container>
    </Router>
    </AuthProvider>
  );
}

export default App;
