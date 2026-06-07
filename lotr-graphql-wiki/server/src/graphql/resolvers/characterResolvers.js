import characterService from "../../services/characterService.js";

export const characterResolvers = {
  Query: {
    characters: async (_, args) => {
      return characterService.getCharacters(args);
    },

    character: async (_, { id }) => {
      return characterService.getCharacterById(id);
    },
  },

  Mutation: {
    createCharacter: async (_, { input }) => {
      return characterService.createCharacter(input);
    },

    updateCharacter: async (_, { id, input }) => {
      return characterService.updateCharacter(id, input);
    },

    deleteCharacter: async (_, { id }) => {
      return characterService.deleteCharacter(id);
    },
  },
};
