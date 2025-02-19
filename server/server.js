import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import dbRoute from "./db/index.js";

dotenv.config();
const server = express();

// Middleware
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));


// Routes
server.use(dbRoute);




export default server;
