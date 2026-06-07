// src/server.js
import "dotenv/config";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { readFileSync } from "fs";
import { resolvers } from "./graphql/resolvers/index.js";

const app = express();

const typeDefs = readFileSync("./src/graphql/schema.graphql", "utf8");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
});

await server.start();

app.use(
  "/graphql",
  helmet(),
  //   To use Apollo server comment out the line above and use this instead:
  /*
 helmet({
    contentSecurityPolicy: false,
  }),
*/
  cors({
    origin: "http://localhost:5500",
    methods: ["POST"],
    allowedHeaders: ["Content-Type", "Apollo-Require-Preflight"],
  }),
  express.json({ limit: "100kb" }),
  expressMiddleware(server),
);

app.listen(4000, () => {
  console.log("GraphQL API running on http://localhost:4000/graphql");
});
