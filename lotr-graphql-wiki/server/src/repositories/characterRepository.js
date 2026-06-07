import prisma from "../db/prismaClient.js";

const findAll = async ({ search, race, page = 1, limit = 10 }) => {
  return prisma.character.findMany({
    where: {
      AND: [
        search
          ? {
              name: {
                contains: search,
              },
            }
          : {},
        race ? { race } : {},
      ],
    },
    include: {
      quotes: true,
    },
    skip: (page - 1) * limit,
    take: limit,
  });
};

const findById = async (id) => {
  return prisma.character.findUnique({
    where: { id: Number(id) },
    include: {
      quotes: true,
    },
  });
};

const create = async (data) => {
  return prisma.character.create({
    data,
    include: {
      quotes: true,
    },
  });
};

const update = async (id, data) => {
  return prisma.character.update({
    where: { id: Number(id) },
    data,
    include: {
      quotes: true,
    },
  });
};

const remove = async (id) => {
  await prisma.character.delete({
    where: { id: Number(id) },
  });

  return true;
};

export default {
  findAll,
  findById,
  create,
  update,
  remove,
};
