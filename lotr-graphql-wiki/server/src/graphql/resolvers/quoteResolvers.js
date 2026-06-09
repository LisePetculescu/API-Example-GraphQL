import quoteService from "../../services/quoteService.js";

export const quoteResolvers = {
  Query: {
    quotes: async () => {
      return quoteService.getQuotes();
    },

    quote: async (_, { id }) => {
      return quoteService.getQuoteById(id);
    },
  },

  Mutation: {
    createQuote: async (_, { input }) => {
      return quoteService.createQuote(input);
    },

    updateQuote: async (_, { id, input }) => {
      return quoteService.updateQuote(id, input);
    },

    deleteQuote: async (_, { id }) => {
      return quoteService.deleteQuote(id);
    },
  },
};
