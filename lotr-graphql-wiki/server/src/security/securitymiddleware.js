import cors from "cors";
import helmet from "helmet";

export const securityMiddleware = [
  helmet(),

  //   To use Apollo Sandbox in browser comment out the line above and use this instead:
  //   WARNING: Making CSP policy false weakens the security against XSS
  //   - Tests should be perfomed with in Postman w. collection in server/tests/LOTR_GraphQL_API_Postman_GraphQL_Mode_Collection.json
  /*
   helmet({
     contentSecurityPolicy: false,
   }),
  */

  cors({
    origin: "http://localhost:5500",
    methods: ["POST"],
    allowedHeaders: ["Content-Type", "Apollo-Require-Preflight"], // the headers which are expected when a request comes from a browser
  }),
];
