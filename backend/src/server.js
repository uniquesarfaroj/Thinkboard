import express from "express"

import cors from "cors";
import notesRoutes  from './routes/notesRoutes.js';

import { connectDB } from "./config/db.js";

import dotenv from "dotenv";

import ratelimiter from "./middleware/rateLimiter.js";


const app = express();

const PORT = process.env.PORT  || 5001;

dotenv.config();

//middleware

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.options("*", cors());


app.use(express.json())

app.use(ratelimiter)

app.use("/api/notes",notesRoutes )

// enable pre-flight request for this route

connectDB().then(() =>{
app.listen(PORT, () => {
    console.log("Server started on PORT: 5001");
});
})




