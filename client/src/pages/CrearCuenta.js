import React, { useState, useContext } from "react";

import { Form, Button } from "semantic-ui-react";

import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../graphql/mutations";

import { AuthContext } from "../context/auth";

const CrearCuenta = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.iniciarSesion(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  const handleOnChangeInputForm = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleSubmitForm = (event) => {
    event.preventDefault();
    addUser();
  };

  return (
    <div className="form-container">
      <Form
        onSubmit={handleSubmitForm}
        noValidate
        className={loading ? "loading" : ""}
      >
        <h1>Registarse</h1>
        <Form.Input
          label="Nombre de usuario"
          placeholder="Nombre de usuario..."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={handleOnChangeInputForm}
        />
        <Form.Input
          label="Correo electronico"
          placeholder="Correo electronico..."
          name="email"
          type="email"
          value={values.email}
          error={errors.email ? true : false}
          onChange={handleOnChangeInputForm}
        />
        <Form.Input
          label="Contraseña"
          placeholder="Contraseña..."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={handleOnChangeInputForm}
        />
        <Form.Input
          label="Confirmar contraseña"
          placeholder="Confirmar contraseña..."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={handleOnChangeInputForm}
        />
        <Button type="submit" primary>
          Crear cuenta
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CrearCuenta;
