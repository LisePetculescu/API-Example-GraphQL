import express from "express";
import { securityMiddleware } from "./security/middleware.js";

const app = express();

app.use(securityMiddleware);
app.use(express.json({ limit: "100kb" }));

export default app;
