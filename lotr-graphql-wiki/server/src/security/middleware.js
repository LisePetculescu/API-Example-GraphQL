import cors from "cors";
import helmet from "helmet";

export const securityMiddleware = [
  helmet(),
  cors({
    origin: "http://localhost:5500",
    methods: ["POST"],
    allowedHeaders: ["Content-Type", "Apollo-Require-Preflight"],
  }),
];
