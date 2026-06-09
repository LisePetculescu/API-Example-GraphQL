import characterRepository from "../repositories/characterRepository.js";
import { characterSchema } from "../validation/characterValidation.js";

// This is where the API integrates with the Database

const getCharacters = async (args) => {
  const page = Math.max(Number(args.page) || 1, 1);
  const limit = Math.min(Number(args.limit) || 10, 50);

  return characterRepository.findAll({
    search: args.search,
    race: args.race,
    page,
    limit,
  });
};

const getCharacterById = async (id) => {
  const character = await characterRepository.findById(id);

  if (!character) {
    throw new Error("Character not found");
  }

  return character;
};

const createCharacter = async (input) => {
  const validatedInput = characterSchema.parse(input);
  return characterRepository.create(validatedInput);
};

const updateCharacter = async (id, input) => {
  await getCharacterById(id);

  const validatedInput = characterSchema.parse(input);
  return characterRepository.update(id, validatedInput);
};

const deleteCharacter = async (id) => {
  await getCharacterById(id);
  return characterRepository.remove(id);
};

export default {
  getCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
