import { characterResolvers } from "./characterResolvers.js";

export const resolvers = {
  Query: {
    ...characterResolvers.Query,
  },

  Mutation: {
    ...characterResolvers.Mutation,
  },
};
