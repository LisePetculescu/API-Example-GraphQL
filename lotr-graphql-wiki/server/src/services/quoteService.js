import quoteRepository from "../repositories/quoteRepository.js";
import characterRepository from "../repositories/characterRepository.js";
import { quoteSchema, quoteUpdateSchema } from "../validation/quoteValidation.js";

const getQuotes = async () => {
  return quoteRepository.findAll();
};

const getQuoteById = async (id) => {
  const quote = await quoteRepository.findById(id);

  if (!quote) {
    throw new Error("Quote not found");
  }

  return quote;
};

const createQuote = async (input) => {
  const validatedInput = quoteSchema.parse(input);

  const character = await characterRepository.findById(validatedInput.characterId);

  if (!character) {
    throw new Error("Character not found");
  }

  return quoteRepository.create(validatedInput);
};

const updateQuote = async (id, input) => {
  await getQuoteById(id);

  const validatedInput = quoteUpdateSchema.parse(input);

  return quoteRepository.update(id, validatedInput);
};

const deleteQuote = async (id) => {
  await getQuoteById(id);

  return quoteRepository.remove(id);
};

export default {
  getQuotes,
  getQuoteById,
  createQuote,
  updateQuote,
  deleteQuote,
};
