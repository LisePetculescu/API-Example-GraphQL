import "dotenv/config";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { readFileSync } from "fs";

import app from "./app.js";
import { resolvers } from "./graphql/resolvers/index.js";

// Loads GraphQL SDL schema
const typeDefs = readFileSync("./src/graphql/schema.graphql", "utf8");
const PORT = process.env.PORT || 4000;

// Configures Apollo GraphQL server
const server = new ApolloServer({
  typeDefs, // Defines available queries, mutations and types
  resolvers, // Maps GraphQL operations to backend services
  csrfPrevention: true, // Apollo's protections against CSRF attacks from a browser
});

await server.start();

app.use(
  "/graphql",
  expressMiddleware(server), // Integrates clients (Postman/frontend) with the GraphQL API
);

app.listen(PORT, () => {
  console.log(`GraphQL API running on http://localhost:${PORT}/graphql`);
});
