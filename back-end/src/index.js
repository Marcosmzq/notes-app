import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

const PORT = process.env.PORT || 7000;

// Start the server and database

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB is connected!"));

server
  .listen(PORT)
  .then(() => console.log(`Server is listening on port ${PORT}`));
