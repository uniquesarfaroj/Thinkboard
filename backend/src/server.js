import express from "express"

import cors from "cors";
import notesRoutes  from './routes/notesRoutes.js';

import { connectDB } from "./config/db.js";

import dotenv from "dotenv";
import path from "path"


import ratelimiter from "./middleware/rateLimiter.js";


const app = express();

const PORT = process.env.PORT  || 5001;

const __dirname = path.resolve()

dotenv.config();

//middleware
if(process.env.NODE_ENV !== "production"){
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);}



app.use(express.json())

app.use(ratelimiter)

app.use("/api/notes",notesRoutes )

app.use(express.static(path.join(__dirname,"../frontend/dist")))

if(process.env.NODE_ENV === "production"){
app.get("*",(req,res) => {
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
})}

// enable pre-flight request for this route

connectDB().then(() =>{
app.listen(PORT, () => {
    console.log("Server started on PORT: 5001");
});
})




