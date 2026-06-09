import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg(process.env.DATABASE_URL);

const prisma = new PrismaClient({
  adapter,
});

await prisma.quote.deleteMany();
await prisma.character.deleteMany();

const characters = [
  {
    name: "Aragorn",
    race: "Man",
    realm: "Gondor",
    birthYear: "2931 Third Age",
    weapon: "Andúril",
    affiliation: "Fellowship of the Ring",
    shortDescription: "The heir of Isildur and future king of Gondor.",
    biography: "Aragorn was raised in Rivendell and later became a ranger of the North. He joined the Fellowship and played a key role in the War of the Ring.",
    imageUrl: "https://example.com/aragorn.jpg",
    quotes: ["If by my life or death I can protect you, I will. You have my sword.", "My friends, you bow to no one."],
  },
  {
    name: "Legolas",
    race: "Elf",
    realm: "Woodland Realm",
    birthYear: "Unknown",
    weapon: "Bow and knives",
    affiliation: "Fellowship of the Ring",
    shortDescription: "An elven prince and master archer.",
    biography: "Legolas was the son of Thranduil of the Woodland Realm. He represented the elves in the Fellowship and became close friends with Gimli.",
    imageUrl: "https://example.com/legolas.jpg",
    quotes: ["He senses danger before others notice it.", "His friendship with Gimli becomes a symbol of old rivalries healing."],
  },
  {
    name: "Gimli",
    race: "Dwarf",
    realm: "Erebor",
    birthYear: "2879 Third Age",
    weapon: "Axe",
    affiliation: "Fellowship of the Ring",
    shortDescription: "A dwarf warrior from the Lonely Mountain.",
    biography: "Gimli was the son of Glóin and represented the dwarves in the Fellowship. He was brave, loyal, and formed an unlikely friendship with Legolas.",
    imageUrl: "https://example.com/gimli.jpg",
    quotes: ["And my axe!", "His friendship with Legolas challenges old divisions."],
  },
  {
    name: "Frodo Baggins",
    race: "Hobbit",
    realm: "The Shire",
    birthYear: "2968 Third Age",
    weapon: "Sting",
    affiliation: "Fellowship of the Ring",
    shortDescription: "The Ring-bearer chosen to carry the One Ring.",
    biography: "Frodo inherited the One Ring from Bilbo and accepted the burden of carrying it to Mordor. His journey changed him deeply.",
    imageUrl: "https://example.com/frodo.jpg",
    quotes: ["I wish the Ring had never come to me. I wish none of this had happened.", "I am glad that you are here with me, Sam. Here at the end of all things"],
  },
  {
    name: "Samwise Gamgee",
    race: "Hobbit",
    realm: "The Shire",
    birthYear: "2980 Third Age",
    weapon: "Sting temporarily, small sword",
    affiliation: "Fellowship of the Ring",
    shortDescription: "Frodo's loyal companion and friend.",
    biography: "Samwise Gamgee began as Frodo's gardener and became one of the bravest heroes of the quest. His loyalty helped Frodo reach Mount Doom.",
    imageUrl: "https://example.com/sam.jpg",
    quotes: ["There's some good in this world, and it's worth fighting for.", "What we need is a few good taters.", "Po-ta-toes. Boil 'em, mash 'em, stick 'em in a stew"],
  },
  {
    name: "Gandalf",
    race: "Maia",
    realm: "Valinor / Middle-earth",
    birthYear: "Before the First Age",
    weapon: "Glamdring and staff",
    affiliation: "Istari, Fellowship of the Ring",
    shortDescription: "A wizard sent to guide the peoples of Middle-earth.",
    biography: "Gandalf was one of the Istari, sent to oppose Sauron. He guided the Fellowship and later returned as Gandalf the White.",
    imageUrl: "https://example.com/gandalf.jpg",
    quotes: ["You shall not pass!", "Fly, you fools!", "All we have to decide is what to do with the time that is given us"],
  },
  {
    name: "Boromir",
    race: "Man",
    realm: "Gondor",
    birthYear: "2978 Third Age",
    weapon: "Sword, shield, horn of Gondor",
    affiliation: "Fellowship of the Ring",
    shortDescription: "A warrior of Gondor tempted by the Ring.",
    biography: "Boromir was the eldest son of Denethor and a captain of Gondor. Though tempted by the Ring, he died defending Merry and Pippin.",
    imageUrl: "https://example.com/boromir.jpg",
    quotes: ["One does not simply walk into Mordor", "It is a strange fate that we should suffer so much fear and doubt over so small a thing."],
  },
  {
    name: "Galadriel",
    race: "Elf",
    realm: "Lothlórien",
    birthYear: "Years of the Trees",
    weapon: "Nenya",
    affiliation: "White Council",
    shortDescription: "The Lady of Lothlórien and bearer of Nenya.",
    biography: "Galadriel was one of the most powerful elves in Middle-earth. She gave gifts to the Fellowship and resisted the temptation of the One Ring.",
    imageUrl: "https://example.com/galadriel.jpg",
    quotes: [
      "Even the smallest person can change the course of the future.",
      "Do not trouble your hearts overmuch with thought of the road tonight. Maybe the paths that you each shall tread are already laid before your feet, though you do not see them.",
      "Instead of a Dark Lord, you would have a queen! Not dark but beautiful and terrible as the dawn! Tempestuous as the sea, and stronger than the foundations of the earth! All shall love me and despair!",
    ],
  },
  {
    name: "Sauron",
    race: "Maia",
    realm: "Mordor",
    birthYear: "Before the First Age",
    weapon: "The One Ring",
    affiliation: "Mordor",
    shortDescription: "The Dark Lord who created the One Ring.",
    biography: "Sauron was once a servant of Morgoth and later became the main dark power in Middle-earth. He created the One Ring to dominate others.",
    imageUrl: "https://example.com/sauron.jpg",
    quotes: ["Build me an army worthy of Mordor!", "You cannot hide. I see you."],
  },
  {
    name: "Arwen",
    race: "Elf",
    realm: "Rivendell",
    birthYear: "241 Third Age",
    weapon: "None",
    affiliation: "Rivendell, Reunited Kingdom",
    shortDescription: "Daughter of Elrond and later queen of Gondor.",
    biography: "Arwen was the daughter of Elrond and chose a mortal life because of her love for Aragorn. Her choice connects the worlds of elves and men.",
    imageUrl: "https://example.com/arwen.jpg",
    quotes: ["I choose a mortal life", "I would rather share one lifetime with you than face all the ages of this world alone."],
  },
];

for (const character of characters) {
  await prisma.character.create({
    data: {
      name: character.name,
      race: character.race,
      realm: character.realm,
      birthYear: character.birthYear,
      weapon: character.weapon,
      affiliation: character.affiliation,
      shortDescription: character.shortDescription,
      biography: character.biography,
      imageUrl: character.imageUrl,
      quotes: {
        create: character.quotes.map((text) => ({ text })),
      },
    },
  });
}

console.log(`Seeded ${characters.length} characters.`);

await prisma.$disconnect();
