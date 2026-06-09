import express from "express";
import { securityMiddleware } from "./security/securitymiddleware.js";

const app = express(); // creates the express server

app.use(...securityMiddleware); // add's security to the app
// Comment out the line above to use Apollo Sandbox
app.use(express.json({ limit: "100kb" })); // Req. body over 100kb gets rejected

export default app;
