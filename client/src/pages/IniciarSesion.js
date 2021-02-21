import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations";

import { AuthContext } from "../context/auth";

const IniciarSesion = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    password: "",
    username: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
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
    loginUser();
  };
  return (
    <div className="form-container">
      <Form
        onSubmit={handleSubmitForm}
        noValidate
        className={loading ? "loading" : ""}
      >
        <h1>Iniciar sesion</h1>
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
          label="Contraseña"
          placeholder="Contraseña..."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={handleOnChangeInputForm}
        />
        <Button type="submit" primary>
          Iniciar sesion
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

export default IniciarSesion;
