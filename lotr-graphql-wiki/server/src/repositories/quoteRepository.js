import prisma from "../db/prismaClient.js";

const findAll = async () => {
  return prisma.quote.findMany({
    include: {
      character: true,
    },
  });
};

const findById = async (id) => {
  return prisma.quote.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      character: true,
    },
  });
};

const create = async (data) => {
  return prisma.quote.create({
    data: {
      text: data.text,
      characterId: Number(data.characterId),
    },
    include: {
      character: true,
    },
  });
};

const update = async (id, data) => {
  return prisma.quote.update({
    where: {
      id: Number(id),
    },
    data: {
      text: data.text,
    },
    include: {
      character: true,
    },
  });
};

const remove = async (id) => {
  await prisma.quote.delete({
    where: {
      id: Number(id),
    },
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
