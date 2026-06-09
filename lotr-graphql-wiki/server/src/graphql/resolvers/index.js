import { characterResolvers } from "./characterResolvers.js";
import { quoteResolvers } from "./quoteResolvers.js";

export const resolvers = {
  Query: {
    ...characterResolvers.Query,
    ...quoteResolvers.Query,
  },

  Mutation: {
    ...characterResolvers.Mutation,
    ...quoteResolvers.Mutation,
  },
};
