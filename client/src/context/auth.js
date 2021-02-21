import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
};

if (localStorage.getItem("jwtToken")) {
  const decodeToken = jwtDecode(localStorage.getItem("jwtToken"));
  
  if (decodeToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodeToken;
  }
}

const AuthContext = createContext({
  user: null,
  iniciarSesion: (userData) => {},
  cerrarSesion: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "INICIAR-SESION":
      return {
        ...state,
        user: action.payload,
      };
    case "CERRAR-SESION":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function iniciarSesion(userData) {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "INICIAR-SESION",
      payload: userData,
    });
  }

  function cerrarSesion() {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "CERRAR-SESION",
    });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, iniciarSesion, cerrarSesion }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
