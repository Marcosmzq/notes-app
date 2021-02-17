import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";

export default (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (err) {
        //existe token y tiene el formato correcto pero está expirado o es invalido.
        throw new AuthenticationError("Invalid/Expired token");
      }
      // existe token pero el formato esta incorrecto
      throw new Error("Authentication token must be ' Bearer [token]");
    }
  }
  // no existe el token
  throw new Error("Authorization header must be provided");
};
