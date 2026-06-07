import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg(process.env.DATABASE_URL);

const prisma = new PrismaClient({
  adapter,
});

await prisma.quote.deleteMany();
await prisma.character.deleteMany();

await prisma.character.create({
  data: {
    name: "Aragorn",
    race: "Man",
    realm: "Gondor",
    birthYear: "2931 Third Age",
    weapon: "Andúril",
    affiliation: "Fellowship of the Ring",
    shortDescription: "The heir of Isildur and rightful king of Gondor.",
    biography: "Aragorn was a ranger of the North who later became King Elessar of Gondor.",
    imageUrl: "https://example.com/aragorn.jpg",
    quotes: {
      create: [
        {
          text: "There is always hope.",
        },
      ],
    },
  },
});

await prisma.character.create({
  data: {
    name: "Legolas",
    race: "Elf",
    realm: "Woodland Realm",
    birthYear: "Unknown",
    weapon: "Bow and knives",
    affiliation: "Fellowship of the Ring",
    shortDescription: "An elven prince and skilled archer.",
    biography: "Legolas was the son of Thranduil and represented the elves in the Fellowship.",
    imageUrl: "https://example.com/legolas.jpg",
    quotes: {
      create: [
        {
          text: "A red sun rises.",
        },
      ],
    },
  },
});

await prisma.$disconnect();
