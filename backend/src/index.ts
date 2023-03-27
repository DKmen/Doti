import express, { Application } from "express";
import * as dotenv from "dotenv";
import cors from "cors";

const app: Application = express();
dotenv.config();
app.use(cors());

const port: Number = parseInt(process.env.PORT ?? "") || 3000;
app.listen(port, (): void => console.log(`server is running... on ${port}`));
