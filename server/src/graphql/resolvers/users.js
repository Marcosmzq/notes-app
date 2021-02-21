import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server";

import {
  validateRegisterInput,
  validateLoginInput,
} from "../../utils/validators";

import User from "../../models/Users";

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
}

export default {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Something is not working well", { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "El usuario ingresado no existe";
        throw new UserInputError("El usuario ingresado no existe", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "La contraseña ingresada no es valida";
        throw new UserInputError("La contraseña ingresada no es valida", {
          errors,
        });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user.id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      //Validate user data

      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Something is not working well", { errors });
      }
      //Make sure that the user and email doesn't already exists
      
      const userEmail = await User.findOne({ email });
      if (userEmail) {
        throw new UserInputError("El email que escribiste ya existe.", {
          errors: {
            email: "El email elegido no está disponible",
          },
        });
      }

      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("El nombre de usuario ya existe.", {
          errors: {
            username: "El nombre de usuario no está disponible",
          },
        });
      }

      //Create an auth token and has password

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res.id,
        token,
      };
    },
  },
};
