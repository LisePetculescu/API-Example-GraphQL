import "dotenv/config";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { readFileSync } from "fs";

import app from "./app.js";
import { resolvers } from "./graphql/resolvers/index.js";

// Loads GraphQL SDL schema
const typeDefs = readFileSync("./src/graphql/schema.graphql", "utf8");

// Configures Apollo GraphQL server
const server = new ApolloServer({
  typeDefs, // Defines available queries, mutations and types
  resolvers, // Maps GraphQL operations to backend services
  csrfPrevention: true, // Apollo's protections against browser-based CSRF attacks
});

await server.start();

app.use(
  "/graphql",
  expressMiddleware(server), // hands requests over to the apollo server
);

app.listen(4000, () => {
  console.log("GraphQL API running on http://localhost:4000/graphql");
});
