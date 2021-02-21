import userResolvers from "./users";
import userNotes from "./notes";

export default {
  Query: {
    ...userNotes.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...userNotes.Mutation,
    ...userResolvers.Mutation,
  },
};
